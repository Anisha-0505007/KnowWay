import TimingCard from "./TimingCard";

function TimingList({ route }) {
    if (!route) {
        return (
            <p className="text-slate-500 text-center py-8">No route selected.</p>
        );
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTime =
        currentHour.toString().padStart(2, "0") +
        ":" +
        currentMin.toString().padStart(2, "0");

    // Find index of next arrival
    const nextIndex = route.timings.findIndex((t) => t >= currentTime);

    // Calculate minutes until the next arrival (derived value)
    let minsAway;
    if (nextIndex !== -1) {
        const [nextHour, nextMin] = route.timings[nextIndex].split(":").map(Number);
        minsAway = (nextHour - currentHour) * 60 + (nextMin - currentMin);
        if (minsAway < 0) minsAway = 0; // safety clamp
    }

    return (
        <div>
            {/* Route info header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-violet-500/30 border border-white/10">
                    {route.type === "bus" ? "🚌" : "🚆"}
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                        {route.type === "bus" ? "Bus Route" : "Train Route"}
                    </p>
                    <h2 className="text-white font-bold text-sm leading-tight">
                        {route.name}
                    </h2>
                </div>
            </div>

            {nextIndex === -1 && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-500/70 border border-amber-500/20 text-amber-400 text-sm font-medium flex items-center gap-2">
                    <span className="animate-pulse">⚠️</span>
                    No more services today. Check back tomorrow!
                </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {route.timings.map((time, index) => (
                    <TimingCard
                        key={time}
                        time={time}
                        isNext={index === nextIndex}
                        isPast={nextIndex === -1 || index < nextIndex}
                        minsAway={index === nextIndex ? minsAway : undefined}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default TimingList;
