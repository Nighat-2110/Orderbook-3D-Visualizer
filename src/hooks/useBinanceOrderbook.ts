import { useEffect } from 'react';
import { useOrderbookStore } from '../store/useOrderbookStore';

export const useBinanceOrderbook = () => {
  const updateOrderbook = useOrderbookStore((s) => s.updateOrderbook);
  const symbol = useOrderbookStore((s) => s.symbol);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const bids = data.b?.map((b: [string, string]) => ({
        price: parseFloat(b[0]),
        size: parseFloat(b[1]),
      })) ?? [];

      const asks = data.a?.map((a: [string, string]) => ({
        price: parseFloat(a[0]),
        size: parseFloat(a[1]),
      })) ?? [];

      updateOrderbook(bids, asks);
    };

    return () => ws.close();
  }, [symbol, updateOrderbook]);
};
