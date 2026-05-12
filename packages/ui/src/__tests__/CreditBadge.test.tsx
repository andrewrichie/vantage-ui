import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreditBadge } from '../components/credit-badge';

describe('CreditBadge', () => {
  it('renders Nero Blue styling when balance >= 5', () => {
    const { container } = render(<CreditBadge balance={10} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toBeDefined();
    expect(badge.className).toContain('text-primary');
    expect(screen.getByText('10')).toBeDefined();
  });

  it('renders Destructive red styling when balance < 5', () => {
    const { container } = render(<CreditBadge balance={3} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toBeDefined();
    expect(badge.className).toContain('text-destructive');
    expect(screen.getByText('3')).toBeDefined();
  });
});
