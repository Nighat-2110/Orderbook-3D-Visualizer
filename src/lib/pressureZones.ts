export type PressureZone = {
  startIndex: number;
  endIndex: number;
  average: number;
  size: number;
};

export function detectPressureZones(
  data: number[],
  thresholdMultiplier: number
): PressureZone[] {
  const zones: PressureZone[] = [];
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const threshold = avg * thresholdMultiplier;
  let currentZone: PressureZone | null = null;

  data.forEach((val, i) => {
    if (val > threshold) {
      if (!currentZone) {
        currentZone = {
          startIndex: i,
          endIndex: i,
          average: val,
          size: 1,
        };
      } else {
        currentZone.endIndex = i;
        currentZone.average = (currentZone.average * currentZone.size + val) / (currentZone.size + 1);
        currentZone.size += 1;
      }
    } else if (currentZone) {
      zones.push(currentZone);
      currentZone = null;
    }
  });

  if (currentZone) zones.push(currentZone);
  return zones;
}

// ✅ Add this wrapper
export function getPressureZones(
  bids: { price: number; size: number }[],
  asks: { price: number; size: number }[],
  thresholdMultiplier: number
) {
  const bidVolumes = bids.map((b) => b.size);
  const askVolumes = asks.map((a) => a.size);

  const pressureZonesBids = detectPressureZones(bidVolumes, thresholdMultiplier).map(z => z.startIndex);
  const pressureZonesAsks = detectPressureZones(askVolumes, thresholdMultiplier).map(z => z.startIndex);

  return { pressureZonesBids, pressureZonesAsks };
}
