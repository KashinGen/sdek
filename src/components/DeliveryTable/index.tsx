import React from 'react';
import DeliveryItem from '../DeliveryItem';
import { Delivery } from '@/types';
import { Spinner } from '../Spinner';

type DeliveryTableProps = {
  deliveries: Delivery[];
  isLoading: boolean;
};

export const DeliveryTable: React.FC<DeliveryTableProps> = ({
  deliveries,
  isLoading,
}) => {
  if (isLoading) return <Spinner />;

  if (deliveries.length === 0) {
    return <div className="text-center py-4">No deliveries found.</div>;
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Created At
          </th>
          <th scope="col" className="px-6 py-3">
            From
          </th>
          <th scope="col" className="px-6 py-3">
            To
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map(delivery => (
          <DeliveryItem key={delivery.uuid} delivery={delivery} />
        ))}
      </tbody>
    </table>
  );
};
