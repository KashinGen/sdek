import { Status } from '@/types';
import Arrow from '@/assets/icons/arrow.svg'
import React from 'react';

interface StatusFilterProps {
  onStatusChange: (status: string) => void;
  currentStatus: string;
  statuses: Status[],
  className?: string;
  selectClassName?: string;
}


const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange, currentStatus, statuses,className='', selectClassName = '' }) => {

  if (!statuses || statuses.length === 0) {
    console.warn('No statuses provided to StatusFilter');
    return null;
  }


  return (
    <div className={`flex items-center justify-end mb-6 ${className}`}>
      <div className="relative inline-flex">
      
        <Arrow className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"/>
        <select
          className={` select-animation border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none ${selectClassName}`}
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Все</option>
          {statuses.map((status: Status) => (
            <option key={status.code} value={status.code}>
              {status.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(StatusFilter);
