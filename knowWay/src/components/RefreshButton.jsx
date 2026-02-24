function RefreshButton({ onRefresh, isLoading }) {
    return (
        <button
            onClick={onRefresh}
            disabled={isLoading}
            className="relative overflow-hidden flex items-center gap-2
                 bg-gradient-to-r from-violet-600 to-blue-600
                 hover:from-violet-500 hover:to-blue-500
                 disabled:from-slate-700 disabled:to-slate-700
                 text-white font-semibold px-5 py-2.5 rounded-xl
                 shadow-lg shadow-violet-500/30
                 hover:shadow-violet-500/50 hover:shadow-xl
                 transition-all duration-200
                 cursor-pointer disabled:cursor-not-allowed text-sm
                 active:scale-95 group"
        >
            {/* Ripple shimmer on hover */}
            <span
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                }}
            />

            {/* Icon */}
            <svg
                className={`w-4 h-4 ${isLoading ? "spin" : ""} relative z-10`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
            </svg>

            <span className="relative z-10">{isLoading ? "Refreshing…" : "Refresh"}</span>

            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </button>
    );
}

export default RefreshButton;
