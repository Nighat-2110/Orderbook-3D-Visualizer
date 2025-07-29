'use client';

import { useOrderbookStore } from '../store/useOrderbookStore';

const symbols = ['btcusdt', 'ethusdt', 'solusdt'];

export default function SymbolSelector() {
  const symbol = useOrderbookStore((s) => s.symbol);
  const setSymbol = useOrderbookStore((s) => s.setSymbol);

  return (
    <div className="p-4 z-10 absolute top-0 left-0">
      <label className="mr-2 font-bold text-white">Symbol:</label>
      <select
        className="p-2 rounded bg-gray-800 text-white"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
