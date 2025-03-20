import React from 'react';
import { render, screen } from '@testing-library/react';
import { Delivery } from '@/types';
import { DeliveryTable } from '@/components/DeliveryTable';
import testData from './mockData.json';

jest.mock('@/components/DeliveryItem', () => ({
  __esModule: true,
  default: () => <tr data-testid="delivery-item" />,
}));

jest.mock('@/components/Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe('DeliveryTable', () => {
  const mockDeliveries: Delivery[] = testData.items;

  it('renders loading spinner when isLoading is true', () => {
    render(<DeliveryTable deliveries={[]} isLoading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders "No deliveries found" message when deliveries array is empty', () => {
    render(<DeliveryTable deliveries={[]} isLoading={false} />);
    expect(screen.getByText('No deliveries found.')).toBeInTheDocument();
  });

  it('renders table with correct headers when deliveries are provided', () => {
    render(<DeliveryTable deliveries={mockDeliveries} isLoading={false} />);

    const headers = ['ID', 'Status', 'Created At', 'From', 'To', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders correct number of DeliveryItem components', () => {
    render(<DeliveryTable deliveries={mockDeliveries} isLoading={false} />);
    const deliveryItems = screen.getAllByTestId('delivery-item');
    expect(deliveryItems).toHaveLength(mockDeliveries.length);
  });
});
