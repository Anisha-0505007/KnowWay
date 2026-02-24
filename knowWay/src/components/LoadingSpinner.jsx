function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
            {/* Dual-ring spinner */}
            <div className="relative w-14 h-14">
                {/* Outer ring — violet */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400 animate-spin" />
                {/* Inner ring — cyan, spins opposite */}
                <div
                    className="absolute inset-[6px] rounded-full border-4 border-transparent border-b-cyan-400 border-l-cyan-300"
                    style={{ animation: "spin 0.7s linear infinite reverse" }}
                />
                {/* Centre dot */}
                <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-80" />
            </div>

            {/* Animated dots text */}
            <p className="text-sm text-slate-400 tracking-wide flex items-center gap-0.5">
                Fetching live schedules
                <span className="inline-flex gap-0.5 ml-0.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
            </p>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default LoadingSpinner;
