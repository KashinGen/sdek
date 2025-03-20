'use client'
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Delivery } from '../../types';
import { formatDate } from '../../utils/formatDate';
import AddressIcon from '@/assets/icons/address.svg';
import Address from '../Address';

interface Props {
  delivery: Delivery;
}

const getStatusColor = (code: string) => {
  switch (code) {
    case 'DELIVERED': return 'bg-green-100 text-green-800';
    case 'IN_TRANSIT': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const DeliveryItem: React.FC<Props> = ({ delivery }) => {
  const router = useRouter();
  const last_status = useMemo(() => delivery.statuses.length > 0 ? delivery.statuses[delivery.statuses.length - 1] : null, [delivery.statuses]);

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {/* {delivery.uuid.slice(0, 8)}... */}
        {delivery.uuid}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {last_status && <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
         last_status.code === 'DELIVERED' ? 'bg-green-100 text-green-800' :
         last_status.code === 'IN_TRANSIT' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {last_status.name}
        </span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(delivery.statuses[0].date_time)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        <Address address={delivery.to_location.address} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
          <Address address={delivery.from_location.address} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => router.push(`/delivery/${delivery.uuid}`)}
          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-full transition duration-150 ease-in-out cursor-pointer"
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default React.memo(DeliveryItem);
