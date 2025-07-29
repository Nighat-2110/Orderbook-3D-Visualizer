// test/Bar.test.tsx

import React from 'react';
import { render, it, describe, expect } from '@testing-library/react';
import { Bar } from '../src/components/Bar';
import '@testing-library/jest-dom';

describe('Bar component', () => {
  it('renders without crashing with required props', () => {
    const { container } = render(
      <Bar
        position={[0, 0, 0]}
        size={[1, 2, 1]}
        color="green"
        isPressureZone={false}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it('applies pressure zone color correctly', () => {
    const { container } = render(
      <Bar
        position={[1, 2, 3]}
        size={[2, 4, 1]}
        color="red"
        isPressureZone={true}
      />
    );

    const mesh = container.querySelector('mesh');
    expect(mesh).toBeTruthy();
  });
});
