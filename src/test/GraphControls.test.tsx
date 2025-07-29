// test/GraphControls.test.tsx
import React from 'react';
import { render, fireEvent, expect, describe, jest, it } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphControls from '../src/components/GraphControls';

describe('GraphControls', () => {
  const props = {
    viewAngle: '3D',
    depthLevels: 10,
    thresholdMultiplier: 1.5,
    refreshRate: 2000,
    barSpacing: 2,
    onViewAngleChange: jest.fn(),
    onDepthLevelsChange: jest.fn(),
    onThresholdMultiplierChange: jest.fn(),
    onRefreshRateChange: jest.fn(),
    onBarSpacingChange: jest.fn(),
  };

  it('renders all controls and triggers handlers on change', () => {
    const { getByLabelText } = render(<GraphControls {...props} />);

    const thresholdInput = getByLabelText(/Threshold Multiplier/i);
    fireEvent.change(thresholdInput, { target: { value: '2.0' } });
    expect(props.onThresholdMultiplierChange).toHaveBeenCalledWith(2.0);

    const refreshSlider = getByLabelText(/Refresh Rate/i);
    fireEvent.change(refreshSlider, { target: { value: '3000' } });
    expect(props.onRefreshRateChange).toHaveBeenCalledWith(3000);

    const viewDropdown = getByLabelText(/View Angle/i);
    fireEvent.change(viewDropdown, { target: { value: 'Top-Down' } });
    expect(props.onViewAngleChange).toHaveBeenCalledWith('Top-Down');
  });
});
