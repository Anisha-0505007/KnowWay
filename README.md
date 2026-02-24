# 🚌 KnowWay — Smart Transport Tracker

> **Know your way around.** A sleek, real-time transport tracker that shows live bus & train schedules, highlights the next upcoming departure, and auto-refreshes so you're never left guessing.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## ✨ Features

- **Live Route Selection** — Choose from 5 bus & train routes via a smooth dropdown
- **Smart Timing Cards** — All departures for the day are displayed as cards, with:
  - 🟢 **Next departure** highlighted and pulsing with a countdown ("in X min" or "Arriving now!")
  - ⬛ Past departures greyed out and struck through
  - Future departures with hover effects
- **Auto-Refresh** — Data refreshes automatically every 30 seconds
- **Live Status Bar** — Shows last-updated time and a live countdown to the next refresh (turns amber → red as it approaches)
- **Shimmer Header** — Animated gradient header with a "LIVE" badge
- **API-backed Data** — Fetches from a real REST API ([JSONPlaceholder](https://jsonplaceholder.typicode.com)) and maps it into route objects dynamically
- **Peak Hour Awareness** — Schedules are generated with shorter intervals during peak hours (7–9 AM, 5–7 PM)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI components & state management |
| [Vite](https://vitejs.dev/) | Lightning-fast dev server & bundler |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) | Mock REST API for route data |

---

## 🗂️ Project Structure

```
knowWay/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Animated gradient header with live badge
│   │   ├── RouteDropdown.jsx   # Route selector dropdown
│   │   ├── TimingCard.jsx      # Individual departure time card
│   │   ├── StatusBar.jsx       # Last-updated + refresh countdown bar
│   │   ├── RefreshButton.jsx   # Manual refresh trigger
│   │   └── LoadingSpinner.jsx  # Loading state UI
│   ├── data/
│   │   └── routes.js           # API fetch + route mapping logic
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/knowway.git
cd knowway/knowWay

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

## 🔌 How Data Works

KnowWay fetches the top 5 items from the JSONPlaceholder `/todos` endpoint and maps them into transport route objects:

| API Field | Mapped To |
|---|---|
| `todo.id` | Route number prefix (101, 202, …) |
| `index` | Route name & type (bus / train) |
| `todo.id` (seed) | Full day schedule with peak-hour awareness |

This demonstrates real API integration with client-side data transformation — no custom backend required.

---

## 📸 Screenshots

> _Add screenshots here after deployment_

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using React + Vite</p>
