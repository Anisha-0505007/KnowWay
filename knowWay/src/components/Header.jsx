function Header() {
    return (
        <div className="relative overflow-hidden header-animate">
            {/* Gradient header bar */}
            <div className="bg-gradient-to-r from-violet-700 via-blue-600 to-cyan-500 px-4 py-6 shadow-2xl relative">
                {/* Decorative blurred blobs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 opacity-25 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

                {/* Animated shimmer sweep */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 3s infinite linear",
                    }}
                />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Logo circle */}
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border border-white/30 hover:scale-105 transition-transform duration-200">
                                🚌
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                                    KnowWay
                                </h1>
                                <p className="text-blue-100 text-xs font-medium tracking-widest uppercase opacity-80">
                                    Smart Transport Tracker
                                </p>
                            </div>
                        </div>

                        {/* Live badge */}
                        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60" />
                            <span className="text-white text-xs font-semibold tracking-wider uppercase">Live</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom glow line */}
            <div className="h-[2px] bg-gradient-to-r from-violet-600 via-blue-400 to-cyan-400 opacity-80 shadow-lg" />

            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}

export default Header;
