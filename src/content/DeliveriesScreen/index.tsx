'use client';

import { DeliveryTable } from '@/components/DeliveryTable';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { useDeliveries } from '@/hooks/useDeliveries';
import { Delivery, Status } from '@/types';

type DeliveriesScreenProps = {
  initialDeliveries: Delivery[];
  initialStatus: string;
  initialPage: number;
  totalPages: number;
  statuses: Status[];
};

/**
 * Screen component for displaying and managing deliveries.
 * @param initialDeliveries - Initial list of deliveries
 * @param initialStatus - Initial status filter
 * @param initialPage - Initial page number
 * @param totalPages - Total page number
 *
 * @param statuses - List of available statuses for filtering
 */

export const DeliveriesScreen: React.FC<DeliveriesScreenProps> = ({
  initialDeliveries,
  initialStatus,
  initialPage,
  totalPages: pages,
  statuses,
}) => {
  const {
    deliveries,
    status,
    setStatus,
    page,
    setPage,
    isLoading,
    totalPages,
    error,
  } = useDeliveries(initialDeliveries, initialStatus, initialPage, pages);

  if (error) {
    return <div className="text-red-500 mb-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StatusFilter
        onStatusChange={setStatus}
        currentStatus={status}
        statuses={statuses}
      />
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <DeliveryTable deliveries={deliveries} isLoading={isLoading} />
      </div>
      <div className="mt-4">
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};
