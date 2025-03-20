'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Delivery } from '@/types';
import { formatDate } from '../../utils/formatDate';

type Props = {
  delivery: Delivery;
};

const DeliveryDetails: React.FC<Props> = ({ delivery }) => {
  const router = useRouter();

  const renderField = (label: string, value: unknown) => {
    if (value === undefined || value === null) return null;
    return (
      <div className="mb-4 sm:mb-2">
        <div className="sm:flex sm:justify-between sm:items-baseline">
          <div className="text-gray-900 font-semibold mb-1 sm:mb-0 sm:mr-4">
            {label}
          </div>
          <div className="text-gray-700">
            {value.toString() || (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <div className="bg-white shadow rounded-lg p-4">{content}</div>
    </div>
  );

  const generalInfo = useMemo(
    () => (
      <>
        {renderField('UUID', delivery.uuid)}
        {renderField('Type', delivery.type)}
        {renderField('CDEK Number', delivery.cdek_number)}
        {renderField('Number', delivery.number)}
        {renderField('Tariff Code', delivery.tariff_code)}
        {renderField('Comment', delivery.comment)}
        {renderField('Shipment Point', delivery.shipment_point)}
        {renderField('Delivery Point', delivery.delivery_point)}
        {renderField('Is Return', delivery.is_return)}
        {renderField('Is Reverse', delivery.is_reverse)}
        {renderField('Is Client Return', delivery.is_client_return)}
        {renderField('Delivery Mode', delivery.delivery_mode)}
      </>
    ),
    [delivery],
  );

  const renderLocation = (location: Delivery['from_location']) => (
    <>
      {renderField('Address', location.address)}
      {renderField('City', location.city)}
      {renderField('Country', location.country)}
      {renderField('Region', location.region)}
      {renderField('Postal Code', location.postal_code)}
    </>
  );

  const renderPackages = useMemo(
    () => (
      <ul>
        {delivery.packages.map((pkg, index) => (
          <li key={index} className="mb-4">
            {renderField('Number', pkg.number)}
            {renderField('Barcode', pkg.barcode)}
            {renderField('Weight', pkg.weight)}
            {renderField('Length', pkg.length)}
            {renderField('Width', pkg.width)}
            {renderField('Height', pkg.height)}
            {renderField('Weight Volume', pkg.weight_volume)}
            {renderField('Weight Calc', pkg.weight_calc)}
            {renderField('Package ID', pkg.package_id)}
            <h4 className="font-semibold mt-2 mb-1">Items:</h4>
            <ul className="pl-4">
              {pkg.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-2">
                  {renderField('Name', item.name)}
                  {renderField('Ware Key', item.ware_key)}
                  {renderField('Weight', item.weight)}
                  {renderField('Amount', item.amount)}
                  {renderField('Cost', item.cost)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    ),
    [delivery.packages],
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to List
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Delivery Details
        </h1>

        {renderSection('General Information', generalInfo)}
        {delivery.sender &&
          renderSection('Sender', renderField('Name', delivery.sender.name))}
        {delivery.recipient &&
          renderSection(
            'Recipient',
            renderField('Name', delivery.recipient.name),
          )}
        {delivery.from_location &&
          renderSection(
            'From Location',
            renderLocation(delivery.from_location),
          )}
        {delivery.to_location &&
          renderSection('To Location', renderLocation(delivery.to_location))}
        {delivery.packages.length > 0 &&
          renderSection('Packages', renderPackages)}

        {delivery.statuses.length > 0 &&
          renderSection(
            'Status History',
            <ul className="divide-y divide-gray-200">
              {delivery.statuses.map((status, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      {status.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(status.date_time)}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{status.city}</p>
                </li>
              ))}
            </ul>,
          )}

        {delivery.delivery_detail &&
          renderSection(
            'Delivery Details',
            <>
              {renderField(
                'Delivery Sum',
                delivery.delivery_detail.delivery_sum,
              )}
              {renderField('Total Sum', delivery.delivery_detail.total_sum)}
              {renderField(
                'Delivery VAT Rate',
                delivery.delivery_detail.delivery_vat_rate,
              )}
              {renderField(
                'Delivery VAT Sum',
                delivery.delivery_detail.delivery_vat_sum,
              )}
              {renderField(
                'Delivery Discount Percent',
                delivery.delivery_detail.delivery_discount_percent,
              )}
              {renderField(
                'Delivery Discount Sum',
                delivery.delivery_detail.delivery_discount_sum,
              )}
            </>,
          )}
      </div>
    </div>
  );
};

export default React.memo(DeliveryDetails);
