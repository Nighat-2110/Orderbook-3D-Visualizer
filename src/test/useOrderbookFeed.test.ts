// test/useOrderbookFeed.test.ts

import { renderHook, act, describe, it, expect } from '@testing-library/react-hooks';
import { useOrderbookFeed } from '../src/hooks/useOrderbookFeed';
import { WSOrderbookLevel } from '../src/types';

const mockData: WSOrderbookLevel[] = [
  { price: 100, quantity: 0.5, side: 'bid' },
  { price: 101, quantity: 0.3, side: 'ask' }
];

describe('useOrderbookFeed', () => {
  it('initializes with empty data', () => {
    const { result } = renderHook(() => useOrderbookFeed('binance'));

    expect(result.current.bids).toEqual([]);
    expect(result.current.asks).toEqual([]);
  });

  it('updates orderbook on incoming data', () => {
    const { result } = renderHook(() => useOrderbookFeed('binance'));

    act(() => {
      result.current.update(mockData);
    });

    expect(result.current.bids).toHaveLength(1);
    expect(result.current.asks).toHaveLength(1);
  });
});
