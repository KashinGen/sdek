// components/Pagination.tsx

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const buttonClass = (disabled: boolean) => `
    relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
    ${disabled 
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
      : 'bg-white text-gray-700 hover:bg-gray-50'}
    border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
  `;

  if (totalPages < 1 || currentPage < 1 || currentPage > totalPages) {
    console.error('Invalid pagination props');
    return null;
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          disabled={isPrevDisabled}
          className={buttonClass(isPrevDisabled)}
        >
          Previous
        </button>
        <button
          onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className={`ml-3 ${buttonClass(isNextDisabled)}`}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Pagination);
