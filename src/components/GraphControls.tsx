'use client';

import React from 'react';

type Props = {
  thresholdMultiplier: number;
  setThresholdMultiplier: (value: number) => void;
  depthLevels: number;
  setDepthLevels: (value: number) => void;
  refreshRate: number;
  setRefreshRate: (value: number) => void;
  barSpacing: number;
  setBarSpacing: (value: number) => void;
  showBids: boolean;
  setShowBids: (value: boolean) => void;
  showAsks: boolean;
  setShowAsks: (value: boolean) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
  viewAngle: 'top' | 'side' | 'diagonal';
  setViewAngle: (value: 'top' | 'side' | 'diagonal') => void;
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;
  fullscreen: boolean;
  setFullscreen: (value: boolean) => void;
  showVolumeProfile: boolean;
  setShowVolumeProfile: (value: boolean) => void;
  showDepthChart: boolean;
  setShowDepthChart: (value: boolean) => void;
};

export default function GraphControls({
  thresholdMultiplier,
  setThresholdMultiplier,
  depthLevels,
  setDepthLevels,
  refreshRate,
  setRefreshRate,
  barSpacing,
  setBarSpacing,
  showBids,
  setShowBids,
  showAsks,
  setShowAsks,
  showTooltip,
  setShowTooltip,
  viewAngle,
  setViewAngle,
  theme,
  setTheme,
  fullscreen,
  setFullscreen,
  showVolumeProfile,
  setShowVolumeProfile,
  showDepthChart,
  setShowDepthChart,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded">
      <div>
        <label>Threshold Multiplier</label>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.1}
          value={thresholdMultiplier}
          onChange={(e) => setThresholdMultiplier(parseFloat(e.target.value))}
        />
        <div>{thresholdMultiplier}</div>
      </div>

      <div>
        <label>Depth Levels</label>
        <input
          type="number"
          min={5}
          max={100}
          value={depthLevels}
          onChange={(e) => setDepthLevels(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label>Refresh Rate (ms)</label>
        <input
          type="number"
          min={200}
          max={5000}
          step={100}
          value={refreshRate}
          onChange={(e) => setRefreshRate(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label>Bar Spacing</label>
        <input
          type="range"
          min={0.5}
          max={5}
          step={0.1}
          value={barSpacing}
          onChange={(e) => setBarSpacing(parseFloat(e.target.value))}
        />
        <div>{barSpacing}</div>
      </div>

      <div>
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <label>View Angle</label>
        <select value={viewAngle} onChange={(e) => setViewAngle(e.target.value as any)}>
          <option value="top">Top</option>
          <option value="side">Side</option>
          <option value="diagonal">Diagonal</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={showBids} onChange={(e) => setShowBids(e.target.checked)} />
        <label>Show Bids</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={showAsks} onChange={(e) => setShowAsks(e.target.checked)} />
        <label>Show Asks</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={showTooltip} onChange={(e) => setShowTooltip(e.target.checked)} />
        <label>Show Tooltip</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={showVolumeProfile} onChange={(e) => setShowVolumeProfile(e.target.checked)} />
        <label>Volume Profile</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={showDepthChart} onChange={(e) => setShowDepthChart(e.target.checked)} />
        <label>Depth Chart</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={fullscreen} onChange={(e) => setFullscreen(e.target.checked)} />
        <label>Fullscreen</label>
      </div>
    </div>
  );
}
