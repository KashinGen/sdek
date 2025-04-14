import { renderHook, act, waitFor } from '@testing-library/react';
import { fetchDeliveries } from '@/services/api';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDeliveries } from '@/hooks/useDeliveries';
import testData from './mockData.json';
import { Delivery } from '@/types';

// Мокаем зависимости
jest.mock('@/services/api');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('lodash', () => ({
  debounce: jest.fn(fn => fn),
}));

describe('useDeliveries', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = '/test';
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('should initialize with provided values', () => {
    const { result } = renderHook(() =>
      useDeliveries(testData.items, 'pending', 1, 10),
    );

    expect(result.current.deliveries).toEqual(testData.items);
    expect(result.current.status).toBe('pending');
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.isLoading).toBe(false);
  });

  it('should fetch data when status changes', async () => {
    const mockFetchDeliveries = fetchDeliveries as jest.MockedFunction<
      typeof fetchDeliveries
    >;
    const mockData = {
      items: [
        {
          uuid: '2',
          statuses: [
            {
              name: 'В процессе',
              code: 'pending',
              date_time: 'test date',
              city: 'Test',
            },
            {
              name: 'Завершено',
              code: 'completed',
              date_time: 'test date',
              city: 'Test',
            },
          ],
        } as Delivery,
      ],
      pagination: { totalPages: 5, currentPage: 1 },
    };
    mockFetchDeliveries.mockResolvedValue(mockData);

    const { result } = renderHook(() => useDeliveries([], 'pending', 1, 1));
    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setStatus('completed');
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(mockFetchDeliveries).toHaveBeenCalledWith(1, 'completed');
      expect(result.current.deliveries).toEqual(mockData.items);
      expect(result.current.totalPages).toBe(5);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should update URL when status or page changes and handle loading state', async () => {
    const { result } = renderHook(() => useDeliveries([], 'pending', 1, 10));

    await act(async () => {
      result.current.setStatus('completed');
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        `${mockPathname}?status=completed`,
        { scroll: false },
      );
    });

    await act(async () => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        `${mockPathname}?status=completed&page=2`,
        { scroll: false },
      );
    });
  });

  it('should handle errors during data fetching', async () => {
    const mockFetchDeliveries = fetchDeliveries as jest.MockedFunction<
      typeof fetchDeliveries
    >;
    mockFetchDeliveries.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useDeliveries([], 'pending', 1, 10));
    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setStatus('completed');
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(
        'Failed to load deliveries. Please try again.',
      );
    });
  });

  it('should reset page to 1 when status changes', async () => {
    const { result } = renderHook(() => useDeliveries([], 'pending', 2, 10));
    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setStatus('completed');
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.page).toBe(1);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle "Все" status correctly and manage loading state', async () => {
    const mockFetchDeliveries = fetchDeliveries as jest.MockedFunction<
      typeof fetchDeliveries
    >;
    mockFetchDeliveries.mockResolvedValue({
      items: testData.items,
      pagination: { totalPages: 1, currentPage: 1 },
    });

    const { result } = renderHook(() => useDeliveries([], 'pending', 1, 10));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      result.current.setStatus('');
    });

    await waitFor(() => {
      expect(mockFetchDeliveries).toHaveBeenCalledWith(1, '');
      expect(result.current.deliveries).toEqual(testData.items);
      expect(result.current.totalPages).toBe(1);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
