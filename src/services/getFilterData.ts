import { ITEMS_PER_PAGE } from '@/const';
import { Delivery, Status } from '@/types';

type ReturnedData = {
  totalPages: number;
  statuses: Status[];
};
export const getFilterData = (items: Delivery[]): ReturnedData => {
  const statusMap = new Map<string, Status>();

  items.forEach(delivery => {
    delivery.statuses.forEach(status => {
      if (!statusMap.has(status.code)) {
        statusMap.set(status.code, status);
      }
    });
  });

  const statuses: Status[] = Array.from(statusMap.values());
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  return {
    totalPages,
    statuses,
  };
};
