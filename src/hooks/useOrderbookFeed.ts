import { useEffect, useState, useRef } from 'react';
import type { OrderLevel, OrderbookData } from '@/lib/types';

export function useOrderbookFeed(
  limit: number = 20,
  venue: 'binance' | 'coinbase' = 'binance',
  refreshRate: number = 1000
): OrderbookData {
  const [bids, setBids] = useState<OrderLevel[]>([]);
  const [asks, setAsks] = useState<OrderLevel[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    let ws: WebSocket;

    const fetchSnapshot = async () => {
      try {
        if (venue === 'binance') {
          const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=${limit}`);
          const data = await res.json();
          if (isMounted) {
            setBids(data.bids.map(([p, q]: [string, string]) => ({ price: +p, size: +q })));
            setAsks(data.asks.map(([p, q]: [string, string]) => ({ price: +p, size: +q })));
          }
        } else {
          const res = await fetch('https://api.exchange.coinbase.com/products/BTC-USD/book?level=2');
          const data = await res.json();
          if (isMounted) {
            setBids(data.bids.slice(0, limit).map(([p, q]: [string, string]) => ({ price: +p, size: +q })));
            setAsks(data.asks.slice(0, limit).map(([p, q]: [string, string]) => ({ price: +p, size: +q })));
          }
        }
      } catch (err) {
        console.error('Snapshot fetch error:', err);
      }
    };

    const setupWebSocket = () => {
      if (venue === 'binance') {
        ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');
        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          const updatedBids = (msg.b || []).map(([p, q]: [string, string]) => ({ price: +p, size: +q }));
          const updatedAsks = (msg.a || []).map(([p, q]: [string, string]) => ({ price: +p, size: +q }));

          if (isMounted) {
            setBids((prev) => mergeLevels(prev, updatedBids, limit));
            setAsks((prev) => mergeLevels(prev, updatedAsks, limit));
          }
        };
      } else {
        ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
        ws.onopen = () => {
          ws.send(JSON.stringify({
            type: 'subscribe',
            product_ids: ['BTC-USD'],
            channels: ['level2'],
          }));
        };
        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.type === 'l2update') {
            const updates = msg.changes.map(([side, p, q]: [string, string, string]) => ({
              price: +p,
              size: +q,
              side,
            }));
            const updatedBids = updates.filter((u) => u.side === 'buy').map(({ price, size }) => ({ price, size }));
            const updatedAsks = updates.filter((u) => u.side === 'sell').map(({ price, size }) => ({ price, size }));

            if (isMounted) {
              setBids((prev) => mergeLevels(prev, updatedBids, limit));
              setAsks((prev) => mergeLevels(prev, updatedAsks, limit));
            }
          }
        };
      }

      wsRef.current = ws;
      intervalRef.current = setInterval(fetchSnapshot, refreshRate);
    };

    fetchSnapshot();
    setupWebSocket();

    return () => {
      isMounted = false;
      wsRef.current?.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [limit, venue, refreshRate]);

  return { bids, asks };
}

function mergeLevels(
  oldLevels: OrderLevel[],
  updates: OrderLevel[],
  limit: number
): OrderLevel[] {
  const map = new Map<number, number>();
  oldLevels.forEach(({ price, size }) => map.set(price, size));
  updates.forEach(({ price, size }) => {
    if (size === 0) map.delete(price);
    else map.set(price, size);
  });

  return Array.from(map.entries())
    .map(([price, size]) => ({ price, size }))
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
}

