'use client';

import { useOrderbookStore } from '../store/useOrderbookStore';
import { useBinanceOrderbook } from '../hooks/useBinanceOrderbook';
import { Box } from '@react-three/drei';

export default function Orderbook3D() {
  const bids = useOrderbookStore((s) => s.bids);
  const asks = useOrderbookStore((s) => s.asks);
  useBinanceOrderbook();

  return (
    <>
      {bids.slice(0, 20).map((bid, index) => (
        <Box
          key={`bid-${index}`}
          args={[1, bid.size, 1]}
          position={[-index * 1.2, bid.size / 2, 0]}
        >
          <meshStandardMaterial color="green" />
        </Box>
      ))}
      {asks.slice(0, 20).map((ask, index) => (
        <Box
          key={`ask-${index}`}
          args={[1, ask.size, 1]}
          position={[index * 1.2, ask.size / 2, 0]}
        >
          <meshStandardMaterial color="red" />
        </Box>
      ))}
    </>
  );
}
