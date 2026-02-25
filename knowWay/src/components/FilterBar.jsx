import { TYPE_EMOJI } from "../data/routes";

const FILTERS = [
    { key: "all", label: "All", emoji: "🗺️" },
    { key: "bus", label: "Bus", emoji: TYPE_EMOJI.bus },
    { key: "train", label: "Train", emoji: TYPE_EMOJI.train },
    { key: "metro", label: "Metro", emoji: TYPE_EMOJI.metro },
];

function FilterBar({ activeFilter, onFilter, counts }) {
    return (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
            {FILTERS.map(({ key, label, emoji }) => {
                const isActive = activeFilter === key;
                const count = key === "all" ? counts.total : (counts[key] ?? 0);

                return (
                    <button
                        key={key}
                        onClick={() => onFilter(key)}
                        className={`
                            flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold
                            border transition-all duration-200 cursor-pointer select-none
                            ${isActive
                                ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/30 scale-105"
                                : "bg-white/[0.05] border-white/10 text-slate-400 hover:border-violet-500/50 hover:text-white hover:bg-white/[0.09]"
                            }
                        `}
                    >
                        <span>{emoji}</span>
                        <span>{label}</span>
                        {/* Route count badge */}
                        <span className={`
                            ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                            ${isActive ? "bg-white/20 text-white" : "bg-white/[0.08] text-slate-500"}
                        `}>
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default FilterBar;
