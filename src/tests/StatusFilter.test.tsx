import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StatusFilter from '@/components/StatusFilter';

describe('StatusFilter', () => {
  const mockStatuses = [
    { code: 'pending', name: 'Pending', date_time: 'test', city: 'test' },
    { code: 'completed', name: 'Completed', date_time: 'test', city: 'test' },
  ];

  it('renders all status options', () => {
    render(
      <StatusFilter
        onStatusChange={() => {}}
        currentStatus=""
        statuses={mockStatuses}
      />,
    );

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onStatusChange when a status is selected', () => {
    const mockOnStatusChange = jest.fn();
    render(
      <StatusFilter
        onStatusChange={mockOnStatusChange}
        currentStatus=""
        statuses={mockStatuses}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'completed' },
    });
    expect(mockOnStatusChange).toHaveBeenCalledWith('completed');
  });

  it('displays the current status as selected', () => {
    render(
      <StatusFilter
        onStatusChange={() => {}}
        currentStatus="pending"
        statuses={mockStatuses}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveValue('pending');
  });
});
