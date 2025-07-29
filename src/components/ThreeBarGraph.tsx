'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useOrderbookFeed } from '@/hooks/useOrderbookFeed';
import { getPressureZones } from '@/lib/pressureZones';
import { OrderLevel } from '@/lib/types';
import Bar from './Bar';

type Props = {
  venue: 'binance' | 'coinbase';
  thresholdMultiplier: number;
  showBids: boolean;
  showAsks: boolean;
  showTooltip: boolean;
  viewAngle: 'top' | 'side' | 'diagonal';
  theme: 'light' | 'dark';
  fullscreen: boolean;
  showVolumeProfile: boolean;
  depthLevels: number;
  refreshRate: number;
  barSpacing: number;
  showCumulativeSum: boolean;
  showDepthChart: boolean;
};

export default function ThreeBarGraph({
  venue,
  thresholdMultiplier,
  showBids,
  showAsks,
  showTooltip,
  viewAngle,
  theme,
  fullscreen,
  showVolumeProfile,
  depthLevels,
  refreshRate,
  barSpacing,
  showCumulativeSum,
  showDepthChart,
}: Props) {
  const { bids, asks } = useOrderbookFeed(depthLevels, venue, refreshRate) as {
    bids: OrderLevel[];
    asks: OrderLevel[];
  };

  const { pressureZonesBids, pressureZonesAsks } = useMemo(() => {
    return getPressureZones(bids, asks, thresholdMultiplier);
  }, [bids, asks, thresholdMultiplier]);

  const zoomRef = useRef<any>();

  useEffect(() => {
  const controls = zoomRef.current;
  if (!controls || !controls.object) return;

  const camera = controls.object;

  const cameraPos = {
    top: [0, 150, 0],
    side: [150, 0, 0],
    diagonal: [80, 80, 80],
  };

  const pos = cameraPos[viewAngle] || cameraPos.diagonal;

  camera.position.set(...pos);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix(); // ✅ Force re-projection
}, [viewAngle]);


  // 📈 Midprice Calculation
  const midPrice = useMemo(() => {
    const bestBid = bids[0]?.price ?? 0;
    const bestAsk = asks[0]?.price ?? 0;
    return (bestBid + bestAsk) / 2;
  }, [bids, asks]);

  // 📊 Volume Profile (binned histogram)
  const volumeProfile = useMemo(() => {
    const all = [...bids, ...asks];
    const bins: Record<number, number> = {};
    const binSize = 5;

    for (let entry of all) {
      const binnedPrice = Math.round(entry.price / binSize) * binSize;
      bins[binnedPrice] = (bins[binnedPrice] || 0) + entry.size;
    }

    return Object.entries(bins).map(([price, size]) => ({
      price: Number(price),
      size,
    }));
  }, [bids, asks]);

  // 📉 Depth Chart Data
  const bidDepthData = useMemo(() => {
    let cumSize = 0;
    return bids
      .slice()
      .sort((a, b) => b.price - a.price)
      .map((b) => {
        cumSize += b.size;
        return { ...b, cumSize };
      });
  }, [bids]);

  const askDepthData = useMemo(() => {
    let cumSize = 0;
    return asks
      .slice()
      .sort((a, b) => a.price - b.price)
      .map((a) => {
        cumSize += a.size;
        return { ...a, cumSize };
      });
  }, [asks]);

  const totalBidVolume = bids.reduce((sum, b) => sum + b.size, 0);
  const totalAskVolume = asks.reduce((sum, a) => sum + a.size, 0);
  const imbalanceRatio = totalAskVolume === 0 ? 1 : totalBidVolume / totalAskVolume;

  return (
    <div className={`w-full h-[80vh] ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <Canvas camera={{ position: [80, 80, 80], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[50, 50, 50]} />
        <OrbitControls ref={zoomRef} />

        {/* Bids */}
        {showBids &&
          bids.map((b, i) => (
            <Bar
              key={`bid-${i}`}
              x={-i * barSpacing}
              height={b.size}
              color={
                pressureZonesBids.includes(i)
                  ? 'orange'
                  : theme === 'dark'
                  ? 'limegreen'
                  : 'green'
              }
              label={showTooltip ? `${b.price.toFixed(2)} / ${b.size}` : ''}
            />
          ))}

        {/* Asks */}
        {showAsks &&
          asks.map((a, i) => (
            <Bar
              key={`ask-${i}`}
              x={i * barSpacing}
              height={a.size}
              color={
                pressureZonesAsks.includes(i)
                  ? 'red'
                  : theme === 'dark'
                  ? 'pink'
                  : 'crimson'
              }
              label={showTooltip ? `${a.price.toFixed(2)} / ${a.size}` : ''}
            />
          ))}

        {/* Cumulative Sum Bars */}
        {showCumulativeSum &&
          bidDepthData.map((b, i) => (
            <Bar
              key={`cumsum-bid-${i}`}
              x={-i * barSpacing}
              height={b.cumSize}
              color="teal"
              transparent
              opacity={0.25}
            />
          ))}

        {showCumulativeSum &&
          askDepthData.map((a, i) => (
            <Bar
              key={`cumsum-ask-${i}`}
              x={i * barSpacing}
              height={a.cumSize}
              color="magenta"
              transparent
              opacity={0.25}
            />
          ))}

        {/* Depth Chart (Overlay) */}
        {showDepthChart &&
          bidDepthData.map((b, i) => (
            <Bar
              key={`depth-bid-${i}`}
              x={-i * barSpacing}
              height={b.cumSize}
              color="blue"
              transparent
              opacity={0.3}
            />
          ))}
        {showDepthChart &&
          askDepthData.map((a, i) => (
            <Bar
              key={`depth-ask-${i}`}
              x={i * barSpacing}
              height={a.cumSize}
              color="purple"
              transparent
              opacity={0.3}
            />
          ))}

        {/* Volume Profile */}
        {showVolumeProfile &&
          volumeProfile.map((vp, i) => (
            <Bar
              key={`vp-${i}`}
              x={0}
              z={i * barSpacing}
              height={vp.size}
              color={theme === 'dark' ? 'gold' : 'orange'}
              label={showTooltip ? `P: ${vp.price} / V: ${vp.size}` : ''}
            />
          ))}

        {/* Midprice Line */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[depthLevels * barSpacing, 0.1, depthLevels * barSpacing]} />
          <meshStandardMaterial color="skyblue" transparent opacity={0.1} />
        </mesh>

        {/* Midprice Tooltip */}
        <Html position={[0, 0.5, 0]}>
          <div
            className={`px-2 py-1 rounded text-xs shadow ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          >
            Midprice: {midPrice.toFixed(2)}
          </div>
        </Html>

        {/* Volume Imbalance Indicator */}
        <Html position={[0, 26, 0]}>
          <div
            className={`px-3 py-1 rounded shadow-lg text-sm font-semibold ${
              theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
            }`}
          >
            Volume Imbalance: {imbalanceRatio.toFixed(2)} →{' '}
            {imbalanceRatio > 1
              ? '🟢 Buyer Dominant'
              : imbalanceRatio < 1
              ? '🔴 Seller Dominant'
              : '⚪️ Balanced'}
          </div>
        </Html>
      </Canvas>
    </div>
  );
}
