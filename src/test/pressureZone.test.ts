// test/pressurezone.test.ts
import { getPressureZones } from '../src/utils/pressurezone';
import { render, it, describe, expect } from '@testing-library/react';
import { OrderbookLevel, PressureZone } from '../src/types';

describe('getPressureZones', () => {
  const mockLevels: OrderbookLevel[] = [
    { price: 10000, size: 2, venue: 'Binance', side: 'bid' },
    { price: 10001, size: 10, venue: 'Binance', side: 'bid' }, // spike
    { price: 10002, size: 1, venue: 'Binance', side: 'bid' },
    { price: 10003, size: 15, venue: 'Binance', side: 'bid' }, // spike
    { price: 10004, size: 2, venue: 'Binance', side: 'bid' },
  ];

  it('detects pressure zones based on size spikes', () => {
    const zones = getPressureZones(mockLevels, 1.5); // threshold multiplier
    expect(zones.length).toBe(2);

    expect(zones[0]).toMatchObject<Partial<PressureZone>>({
      price: 10001,
      size: 10,
    });

    expect(zones[1]).toMatchObject<Partial<PressureZone>>({
      price: 10003,
      size: 15,
    });
  });

  it('returns empty array if no zones meet threshold', () => {
    const lowVolumeLevels = mockLevels.map(l => ({ ...l, size: 1 }));
    const zones = getPressureZones(lowVolumeLevels, 2.0);
    expect(zones).toEqual([]);
  });
});
