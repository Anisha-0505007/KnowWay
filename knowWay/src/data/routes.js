// 🌐 Real API Integration
// We fetch from jsonplaceholder.typicode.com/todos
// Then map the todos into route objects locally.
//
// Mapping logic:
//   - We take the first 10 todos (one per route)
//   - todo.id       → used as timing seed for variety
//   - index         → picks from ROUTE_NAMES / ROUTE_PREFIXES / ROUTE_TYPES
//   - Timings are generated based on todo.id (deterministic, realistic spread)

const ROUTE_NAMES = [
    "City Center ↔ Airport",
    "North Station ↔ Market Square",
    "East End ↔ University",
    "South Gate ↔ Tech Park",
    "West Mall ↔ Harbor",
    "Old Town ↔ Central Park",
    "Riverside ↔ Business District",
    "Hillside ↔ Shopping Mall",
    "Suburb North ↔ Downtown",
    "Lakeside ↔ Industrial Zone",
];

const ROUTE_PREFIXES = [
    "101", "202", "303", "404", "505",
    "606", "707", "808", "909", "010",
];

// Route type: 0 = bus, 1 = train, 2 = metro
const ROUTE_TYPES = [
    "bus", "train", "metro",
    "bus", "train",
    "metro", "bus", "train",
    "metro", "bus",
];

// Emoji per transport type
export const TYPE_EMOJI = {
    bus: "🚌",
    train: "🚆",
    metro: "🚇",
};

// Generate a list of timings spread across the day based on a seed number
function generateTimings(seed) {
    const timings = [];
    // Start hour varies by seed (5am to 8am)
    let hour = 5 + (seed % 4);
    let minute = (seed * 7) % 60;

    while (hour < 23) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        timings.push(`${h}:${m}`);

        // Interval varies: peak hours (7–9am, 5–7pm) = ~15 min, off-peak = ~30 min
        const isPeak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
        // Metro runs more frequently even off-peak
        const interval = isPeak ? 10 : 20;

        minute += interval;
        if (minute >= 60) {
            minute -= 60;
            hour += 1;
        }
    }

    return timings;
}

// 🚀 fetchRoutes — calls the real API and maps data locally
export async function fetchRoutes() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const todos = await response.json();

    // Map each todo → a route object
    const routes = todos.map((todo, index) => ({
        id: ROUTE_PREFIXES[index],
        name: `Route ${ROUTE_PREFIXES[index]} – ${ROUTE_NAMES[index]}`,
        type: ROUTE_TYPES[index],
        timings: generateTimings(todo.id),   // derived from todo.id for variety
        apiTitle: todo.title,                 // original todo title (for learning)
    }));

    return routes;
}
