'use client';

type Props = {
  venue: 'binance' | 'coinbase';
  setVenue: (v: 'binance' | 'coinbase') => void;
  thresholdMultiplier: number;
  setThresholdMultiplier: (n: number) => void;
  showBids: boolean;
  setShowBids: (b: boolean) => void;
  showAsks: boolean;
  setShowAsks: (b: boolean) => void;
  showTooltip: boolean;
  setShowTooltip: (b: boolean) => void;
  viewAngle: 'top' | 'side' | 'diagonal';
  setViewAngle: (v: 'top' | 'side' | 'diagonal') => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  fullscreen: boolean;
  setFullscreen: (v: boolean) => void;
  showVolumeProfile: boolean;
  setShowVolumeProfile: (v: boolean) => void;
  onSnapshot: () => void;
  onExportGLTF: () => void;

  // Phase 16 Controls
  depthLevels: number;
  setDepthLevels: (v: number) => void;
  refreshRate: number;
  setRefreshRate: (v: number) => void;
  barSpacing: number;
  setBarSpacing: (v: number) => void;

  // Phase 19 Controls
  showCumulativeSum: boolean;
  setShowCumulativeSum: (v: boolean) => void;
  showDepthChart: boolean;
  setShowDepthChart: (v: boolean) => void;

  // Phase 20 Controls
  cumulativeOpacity: number;
  setCumulativeOpacity: (v: number) => void;
  depthLineWidth: number;
  setDepthLineWidth: (v: number) => void;
};

export default function ControlPanel({
  venue,
  setVenue,
  thresholdMultiplier,
  setThresholdMultiplier,
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
  onSnapshot,
  onExportGLTF,
  depthLevels,
  setDepthLevels,
  refreshRate,
  setRefreshRate,
  barSpacing,
  setBarSpacing,
  showCumulativeSum,
  setShowCumulativeSum,
  showDepthChart,
  setShowDepthChart,
  cumulativeOpacity,
  setCumulativeOpacity,
  depthLineWidth,
  setDepthLineWidth,
}: Props) {
  const handleReset = () => {
    setVenue('binance');
    setThresholdMultiplier(2);
    setShowBids(true);
    setShowAsks(true);
    setShowTooltip(true);
    setViewAngle('diagonal');
    setTheme('light');
    setFullscreen(false);
    setShowVolumeProfile(true);
    setDepthLevels(20);
    setRefreshRate(1000);
    setBarSpacing(1.0);
    setShowCumulativeSum(true);
    setShowDepthChart(true);
    setCumulativeOpacity(0.7);
    setDepthLineWidth(2);
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-gray-100 shadow-md dark:bg-gray-800 dark:text-white">
      <div>
        <label className="block mb-1">Venue</label>
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value as 'binance' | 'coinbase')}
          className="w-full p-2 border rounded"
        >
          <option value="binance">Binance</option>
          <option value="coinbase">Coinbase</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Depth Levels (Limit)</label>
        <input
          type="number"
          value={depthLevels}
          min={5}
          max={100}
          onChange={(e) => setDepthLevels(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Refresh Rate (ms)</label>
        <input
          type="number"
          value={refreshRate}
          min={100}
          max={10000}
          step={100}
          onChange={(e) => setRefreshRate(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Threshold Multiplier</label>
        <input
          type="number"
          value={thresholdMultiplier}
          onChange={(e) => setThresholdMultiplier(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Bar Spacing</label>
        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={barSpacing}
          onChange={(e) => setBarSpacing(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={showBids} onChange={(e) => setShowBids(e.target.checked)} />
        <label>Show Bids</label>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={showAsks} onChange={(e) => setShowAsks(e.target.checked)} />
        <label>Show Asks</label>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={showTooltip} onChange={(e) => setShowTooltip(e.target.checked)} />
        <label>Show Tooltip</label>
      </div>

      <div>
        <label className="block mb-1">View Angle</label>
        <select
          value={viewAngle}
          onChange={(e) => setViewAngle(e.target.value as 'top' | 'side' | 'diagonal')}
          className="w-full p-2 border rounded"
        >
          <option value="top">Top</option>
          <option value="side">Side</option>
          <option value="diagonal">Diagonal</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={showCumulativeSum} onChange={(e) => setShowCumulativeSum(e.target.checked)} />
        <label>Cumulative Sum Overlay</label>
      </div>

      {showCumulativeSum && (
        <div>
          <label className="block mb-1">Cumulative Opacity</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={cumulativeOpacity}
            onChange={(e) => setCumulativeOpacity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={showDepthChart} onChange={(e) => setShowDepthChart(e.target.checked)} />
        <label>Depth Chart</label>
      </div>

      {showDepthChart && (
        <div>
          <label className="block mb-1">Depth Chart Line Width</label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={depthLineWidth}
            onChange={(e) => setDepthLineWidth(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <div>
        <label className="block mb-1">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          className="w-full p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={fullscreen} onChange={(e) => setFullscreen(e.target.checked)} />
        <label>Fullscreen</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showVolumeProfile}
          onChange={(e) => setShowVolumeProfile(e.target.checked)}
        />
        <label>Show Volume Profile</label>
      </div>

      <button
        onClick={handleReset}
        className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Reset to Default
      </button>

      <button
        onClick={onSnapshot}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        📸 Take Snapshot
      </button>

      <button
        onClick={onExportGLTF}
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        ⬇️ Export GLTF/GLB
      </button>
    </div>
  );
}
