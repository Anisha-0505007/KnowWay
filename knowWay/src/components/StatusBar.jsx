// 📡 StatusBar Component
// Props:
//   lastUpdated — Date object (or null)
//   countdown   — number (seconds until next auto-refresh)

function StatusBar({ lastUpdated, countdown }) {
    const formatted = lastUpdated
        ? lastUpdated.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        : "Never";

    // Colour the countdown: red when ≤5s, amber ≤10s, green otherwise
    const countdownColor =
        countdown <= 5
            ? "text-red-400"
            : countdown <= 10
                ? "text-amber-400"
                : "text-emerald-400";

    const urgency = countdown <= 5 ? "border-red-500/30 bg-red-500/5" : "border-white/10 bg-white/[0.04]";

    return (
        <div className={`flex items-center gap-2 text-xs text-slate-400 mt-4 glass-card px-4 py-3 border ${urgency} transition-colors duration-700`}>
            {/* Live pulse dot */}
            <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span>
                Last updated:{" "}
                <span className="font-semibold text-slate-200">{formatted}</span>
            </span>

            {/* Countdown on the right */}
            <span className="ml-auto flex items-center gap-1.5">
                <span className="text-slate-500">Refresh in</span>
                <span className={`font-bold tabular-nums text-sm ${countdownColor} transition-colors duration-500`}>
                    {countdown}s
                </span>
            </span>
        </div>
    );
}

export default StatusBar;
