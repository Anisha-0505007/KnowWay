import { useState, useEffect } from "react";
import { fetchRoutes } from "./data/routes";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import RouteDropdown from "./components/RouteDropdown";
import TimingList from "./components/TimingList";
import RefreshButton from "./components/RefreshButton";
import StatusBar from "./components/StatusBar";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {

    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState("");
    const [filterType, setFilterType] = useState("all"); // "all" | "bus" | "train" | "metro"
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(30); // seconds until next auto-refresh

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);   // clear previous errors on each fetch
        try {
            const data = await fetchRoutes();   // real API call now!
            setRoutes(data);
            setLastUpdated(new Date());
            setSelectedRoute((prev) => prev || data[0]?.id || "");
            setCountdown(30); // reset countdown after every successful fetch
        } catch (err) {
            setError(err.message || "Failed to load routes. Check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Auto-refresh every 30s
        const fetchInterval = setInterval(() => {
            fetchData();
        }, 30000);

        // Countdown tick — decrements every second, resets when fetchData runs
        const tickInterval = setInterval(() => {
            setCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(tickInterval);
        };
    }, []);

    // Filter routes by selected transport type
    const filteredRoutes = filterType === "all"
        ? routes
        : routes.filter((r) => r.type === filterType);

    // Per-type counts for the badge labels
    const counts = {
        total: routes.length,
        bus: routes.filter((r) => r.type === "bus").length,
        train: routes.filter((r) => r.type === "train").length,
        metro: routes.filter((r) => r.type === "metro").length,
    };

    const activeRoute = filteredRoutes.find((r) => r.id === selectedRoute);

    // When filter changes, auto-select the first route in the new list
    const handleFilter = (type) => {
        setFilterType(type);
        const list = type === "all" ? routes : routes.filter((r) => r.type === type);
        if (list.length > 0) setSelectedRoute(list[0].id);
    };

    return (
        <div className="gradient-bg">
            <Header />

            <main className="max-w-2xl mx-auto px-4 py-8">
                {isLoading && routes.length === 0 ? (
                    <LoadingSpinner />
                ) : error && routes.length === 0 ? (
                    // Error state — only shown if we have no cached data to display
                    <div className="glass-card p-8 text-center">
                        <div className="text-4xl mb-3">⚠️</div>
                        <p className="text-red-400 font-semibold mb-1">Failed to load schedules</p>
                        <p className="text-slate-500 text-sm mb-5">{error}</p>
                        <button
                            onClick={fetchData}
                            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <FilterBar
                            activeFilter={filterType}
                            onFilter={handleFilter}
                            counts={counts}
                        />

                        <RouteDropdown
                            routes={filteredRoutes}
                            selectedRoute={selectedRoute}
                            onSelect={setSelectedRoute}
                        />

                        <div className="glass-card p-6 mb-4">
                            <TimingList route={activeRoute} />
                        </div>

                        <div className="flex justify-end mb-2">
                            <RefreshButton onRefresh={fetchData} isLoading={isLoading} />
                        </div>

                        <StatusBar lastUpdated={lastUpdated} countdown={countdown} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
