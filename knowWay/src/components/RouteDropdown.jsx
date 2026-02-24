function RouteDropdown({ routes, selectedRoute, onSelect }) {
    return (
        <div className="mb-6">
            <label
                htmlFor="route-select"
                className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest"
            >
                Select Route
            </label>
            <div className="relative group">
                {/* Left accent stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b from-violet-500 to-blue-500 opacity-80 group-focus-within:opacity-100 transition-opacity duration-200" />

                <select
                    id="route-select"
                    value={selectedRoute}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full appearance-none pl-5 pr-10 py-3 rounded-xl
                     text-white text-sm font-medium
                     border border-white/10
                     focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/60
                     cursor-pointer transition-all duration-200
                     hover:border-violet-500/40"
                    style={{ background: "rgba(15, 15, 30, 0.70)", backdropFilter: "blur(12px)" }}
                >
                    {routes.map((route) => (
                        <option
                            key={route.id}
                            value={route.id}
                            style={{ background: "#1a1a2e", color: "white" }}
                        >
                            {route.type === "bus" ? "🚌" : "🚆"} {route.name}
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-200 text-sm">
                    ▾
                </div>
            </div>
        </div>
    );
}

export default RouteDropdown;
