import { create } from 'zustand';

type Order = {
  price: number;
  size: number;
};

type OrderbookState = {
  bids: Order[];
  asks: Order[];
  symbol: string;
  venue: string;
  setSymbol: (symbol: string) => void;
  setVenue: (venue: string) => void;
  updateOrderbook: (bids: Order[], asks: Order[]) => void;
};

export const useOrderbookStore = create<OrderbookState>((set) => ({
  bids: [],
  asks: [],
  symbol: 'btcusdt',
  venue: 'binance',
  setSymbol: (symbol) => set({ symbol }),
  setVenue: (venue) => set({ venue }),
  updateOrderbook: (bids, asks) => set({ bids, asks }),
}));
