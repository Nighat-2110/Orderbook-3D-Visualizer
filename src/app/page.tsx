'use client';

import { useRef, useState, useEffect } from 'react';
import ThreeBarGraph, { ThreeBarGraphRef } from '@/components/ThreeBarGraph';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  const graphRef = useRef<ThreeBarGraphRef>(null);

  const [venue, setVenue] = useState<'binance' | 'coinbase'>('binance');
  const [thresholdMultiplier, setThresholdMultiplier] = useState<number>(2);
  const [numberOfLevels, setNumberOfLevels] = useState<number>(20);
  const [refreshRate, setRefreshRate] = useState<number>(500);
  const [showBids, setShowBids] = useState<boolean>(true);
  const [showAsks, setShowAsks] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [viewAngle, setViewAngle] = useState<'top' | 'side' | 'diagonal'>('diagonal');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [highlightZones, setHighlightZones] = useState<boolean>(true);
  const [showVolumeProfile, setShowVolumeProfile] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  // Handle exiting fullscreen on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };

    if (fullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [fullscreen]);

  // PNG snapshot export
  const handleSnapshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `snapshot-${venue}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      alert('Snapshot failed: Canvas not found.');
    }
  };

  // GLTF export
  const handleGLTFExport = () => {
    if (graphRef.current) {
      graphRef.current.exportGLTF();
    } else {
      alert('3D Graph not ready for export.');
    }
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      } flex flex-col md:flex-row gap-6`}
    >
      {!fullscreen && (
        <div className="w-full md:w-1/4">
          <ControlPanel
            venue={venue}
            setVenue={setVenue}
            thresholdMultiplier={thresholdMultiplier}
            setThresholdMultiplier={setThresholdMultiplier}
            numberOfLevels={numberOfLevels}
            setNumberOfLevels={setNumberOfLevels}
            refreshRate={refreshRate}
            setRefreshRate={setRefreshRate}
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
            highlightZones={highlightZones}
            setHighlightZones={setHighlightZones}
            onSnapshot={handleSnapshot}
            onExportGLTF={handleGLTFExport}
          />
        </div>
      )}

      <div
        className={`w-full md:w-3/4 h-[500px] relative ${
          fullscreen ? 'fixed inset-0 z-50 bg-black p-2' : ''
        }`}
      >
        <ThreeBarGraph
          ref={graphRef}
          venue={venue}
          thresholdMultiplier={thresholdMultiplier}
          numberOfLevels={numberOfLevels}
          refreshRate={refreshRate}
          showBids={showBids}
          showAsks={showAsks}
          showTooltip={showTooltip}
          viewAngle={viewAngle}
          theme={theme}
          highlightZones={highlightZones}
          showVolumeProfile={showVolumeProfile}
        />

        {fullscreen && (
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-200"
          >
            Exit Fullscreen (Esc)
          </button>
        )}
      </div>
    </div>
  );
}
