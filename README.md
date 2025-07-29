# 📈 Orderbook Depth 3D Visualizer

A real-time, interactive 3D web application for visualizing orderbook depth across cryptocurrency trading venues. Built with React Three Fiber and TypeScript, this project helps traders, analysts, and developers analyze bid/ask volumes, pressure zones, volume profiles, and price imbalance.

---

## 📌 Features

- ✅ **Real-Time Orderbook Visualization**
- ✅ **Interactive 3D Graph using Three.js**
- ✅ **Venue Filtering (Binance, OKX, Bybit, etc.)**
- ✅ **Pressure Zone Detection and Highlighting**
- ✅ **Volume Profile and Depth Chart**
- ✅ **Midprice Line & Volume Imbalance**
- ✅ **User-Tunable Controls for Thresholds, Depth, View Angle**
- ✅ **Unit Testing for Algorithms and Core Components**

---

## 🧠 Assumptions

- Orderbook data is simulated or fetched in JSON format with price and volume for bid and ask sides.
- Volume thresholds for pressure zones are calculated based on a configurable multiplier of the average volume in the current depth window.
- Z-axis in 3D graph is used as a pseudo-time indicator for animation flow.
- Venue names are standardized and match the simulated dataset structure (`binance`, `okx`, etc.).

---

## 🔗 APIs and Libraries Used

### 📡 APIs / Data Feed

- `useOrderbookFeed.ts`: Simulated or real-time orderbook data, structured as:
  ```ts
  {
    price: number,
    volume: number,
    side: 'bid' | 'ask',
    venue: string
  }

