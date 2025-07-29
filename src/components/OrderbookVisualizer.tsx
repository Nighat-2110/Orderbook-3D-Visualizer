'use client';

import { useState } from 'react';
import ThreeBarGraph from './ThreeBarGraph';
import GraphControls from './GraphControls';

export default function OrderbookVisualizer() {
  const [thresholdMultiplier, setThresholdMultiplier] = useState(1.5);
  const [depthLevels, setDepthLevels] = useState(20);
  const [refreshRate, setRefreshRate] = useState(1000);
  const [barSpacing, setBarSpacing] = useState(1);

  const [showBids, setShowBids] = useState(true);
  const [showAsks, setShowAsks] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [viewAngle, setViewAngle] = useState<'top' | 'side' | 'diagonal'>('diagonal');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fullscreen, setFullscreen] = useState(false);
  const [showVolumeProfile, setShowVolumeProfile] = useState(true);
  const [showDepthChart, setShowDepthChart] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <GraphControls
        thresholdMultiplier={thresholdMultiplier}
        setThresholdMultiplier={setThresholdMultiplier}
        depthLevels={depthLevels}
        setDepthLevels={setDepthLevels}
        refreshRate={refreshRate}
        setRefreshRate={setRefreshRate}
        barSpacing={barSpacing}
        setBarSpacing={setBarSpacing}
        showBids={showBids}
        setShowBids={setShowBids}
        showAsks={showAsks}
        setShowAsks={setShowAsks}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        viewAngle={viewAngle}
        setViewAngle={setViewAngle}
        theme={theme}
        setTheme={setTheme}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        showVolumeProfile={showVolumeProfile}
        setShowVolumeProfile={setShowVolumeProfile}
        showDepthChart={showDepthChart}
        setShowDepthChart={setShowDepthChart}
      />

      <ThreeBarGraph
        venue="binance"
        thresholdMultiplier={thresholdMultiplier}
        showBids={showBids}
        showAsks={showAsks}
        showTooltip={showTooltip}
        viewAngle={viewAngle}
        theme={theme}
        fullscreen={fullscreen}
        showVolumeProfile={showVolumeProfile}
        depthLevels={depthLevels}
        refreshRate={refreshRate}
        barSpacing={barSpacing}
        showCumulativeSum={true}
        showDepthChart={showDepthChart}
      />
    </div>
  );
}
