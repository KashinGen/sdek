import { DeliveryResponse, Delivery } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const fetchDeliveries = async (
  page: number = 1,
  status?: string,
): Promise<DeliveryResponse> => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  params.append('page', page.toString());


  const response = await fetch(`${API_URL}/deliveries?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch deliveries');
  }
  return response.json();
};

export const fetchDeliveryDetails = async (uid: string): Promise<Delivery> => {
  const response = await fetch(`${API_URL}/deliveries/${uid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch delivery details');
  }
  return response.json();
};
