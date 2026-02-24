// ⏱️ TimingCard Component
// Props:
//   time     — string like "08:30"
//   isNext   — boolean, true if this is the NEXT upcoming arrival
//   isPast   — boolean, true if this time has already passed
//   minsAway — number, minutes until this arrival (only passed when isNext=true)
//   index    — number, used for stagger delay

function TimingCard({ time, isNext, isPast, minsAway, index = 0 }) {
    const delay = `${(index * 40)}ms`;

    let cardStyle =
        "rounded-xl px-3 py-3 text-center text-sm font-semibold transition-all duration-300 fade-in-up ";

    if (isNext) {
        cardStyle +=
            "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-green-500/40 scale-110 pulse-next border border-green-300/40";
    } else if (isPast) {
        cardStyle += "bg-white/[0.03] text-slate-600 line-through opacity-50";
    } else {
        cardStyle +=
            "bg-white/[0.06] text-slate-300 border border-white/10 hover:border-violet-500/60 hover:bg-violet-500/15 hover:text-white hover:shadow-md hover:shadow-violet-500/20 cursor-default";
    }

    return (
        <div className={cardStyle} style={{ animationDelay: delay }}>
            {isNext && (
                <>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-green-100">
                        Next ➜
                    </div>
                    <div className="text-lg font-bold">{time}</div>
                    {minsAway !== undefined && (
                        <div className="text-[11px] text-green-100 mt-0.5 font-medium">
                            {minsAway === 0 ? "Arriving now!" : `in ${minsAway} min`}
                        </div>
                    )}
                </>
            )}
            {!isNext && time}
        </div>
    );
}

export default TimingCard;
