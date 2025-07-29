// test/ThreeBarGraph.test.tsx
import React from 'react';
import { render, it, expect, describe, jest } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThreeBarGraph from '../src/components/ThreeBarGraph';
import { OrderbookLevel } from '../src/types';

const mockBids: OrderbookLevel[] = [
  { price: 10000, size: 5, venue: 'Binance', side: 'bid' },
  { price: 9990, size: 3, venue: 'Binance', side: 'bid' },
];

const mockAsks: OrderbookLevel[] = [
  { price: 10010, size: 4, venue: 'Binance', side: 'ask' },
  { price: 10020, size: 6, venue: 'Binance', side: 'ask' },
];

jest.mock('three', () => {
  const originalThree = jest.requireActual('three');
  return {
    ...originalThree,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      render: jest.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('ThreeBarGraph', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThreeBarGraph
        bids={mockBids}
        asks={mockAsks}
        viewAngle="3D"
        depthChart
        volumeProfile
        thresholdMultiplier={1}
        barSpacing={1}
        pressureZones={[]}
        showMidprice
        showVolumeImbalance
      />
    );
    expect(container).toBeInTheDocument();
  });
});
