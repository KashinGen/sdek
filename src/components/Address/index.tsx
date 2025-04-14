'use client';

import React, { useState, useMemo } from 'react';
import AddressIcon from '@/assets/icons/address.svg';

interface AddressProps {
  address?: string;
  maxLength?: number;
}

const Address: React.FC<AddressProps> = ({ address, maxLength = 15 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shortenedAddress = useMemo(() => {
    if (!address) return '-';
    if (address.length <= maxLength) return address;
    const words = address.split(' ');
    const lastWord = words[words.length - 1];
    const availableLength = maxLength - lastWord.length - 3;
    const shortened = address.slice(0, availableLength).trim();
    return `${shortened}... ${lastWord}`;
  }, [address, maxLength]);

  return (
    <div className="flex items-start w-64">
      <AddressIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
      <div className="flex flex-wrap items-center">
        {!isExpanded ? (
          <span className="text-sm text-gray-500">{shortenedAddress}</span>
        ) : (
          <span className="text-sm text-gray-500 whitespace-pre-wrap break-words">
            {address}
          </span>
        )}
        {address && address.length > maxLength && (
          <button
            onClick={toggleExpand}
            className="ml-5 text-xs text-indigo-600 hover:text-indigo-800 focus:outline-none"
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Address);
