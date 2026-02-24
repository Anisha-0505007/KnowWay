// 🌐 Real API Integration
// We fetch from jsonplaceholder.typicode.com/todos
// Then map the todos into route objects locally.
//
// Mapping logic:
//   - We take the first 5 todos (one per route)
//   - todo.id       → route id (as string)
//   - todo.title    → route name (formatted)
//   - todo.id % 2   → type: even = "bus", odd = "train"
//   - Timings are generated based on todo.id (deterministic, realistic spread)

const ROUTE_NAMES = [
    "City Center ↔ Airport",
    "North Station ↔ Market Square",
    "East End ↔ University",
    "South Gate ↔ Tech Park",
    "West Mall ↔ Harbor",
];

const ROUTE_PREFIXES = ["101", "202", "303", "404", "505"];

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
        const interval = isPeak ? 15 : 30;

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
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const todos = await response.json();

    // Map each todo → a route object
    const routes = todos.map((todo, index) => ({
        id: ROUTE_PREFIXES[index],
        name: `Route ${ROUTE_PREFIXES[index]} – ${ROUTE_NAMES[index]}`,
        type: index % 2 === 0 ? "bus" : "train",
        timings: generateTimings(todo.id),   // derived from todo.id for variety
        apiTitle: todo.title,                // original todo title (for learning)
    }));

    return routes;
}
