'use client';
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/20/solid';
import { Button } from '@heroui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageButton = (page: number) => (
    <Button
      key={page}
      onPress={() => onPageChange(page)}
      className={`w-11 h-11 flex items-center justify-center rounded-full text-xs transition
        ${page === currentPage ? 'bg-lightGray font-medium' : 'hover:bg-lightGray'}
      `}
    >
      {page}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="w-11 h-11 flex items-center justify-center text-gray"
    >
      ...
    </span>
  );

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      pages.push(renderPageButton(1));

      if (currentPage > 3) {
        pages.push(renderEllipsis('start'));
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) {
        pages.push(renderEllipsis('end'));
      }

      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <Button
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-11 h-11 flex items-center justify-center rounded-full transition
          ${currentPage === 1 ? 'cursor-not-allowed opacity-40' : 'hover:bg-lightGray'}
        `}
      >
        <ChevronDoubleLeftIcon className="w-4 h-4" />
      </Button>

      {renderPages()}

      {/* Next button */}
      <Button
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-11 h-11 flex items-center justify-center rounded-full transition
          ${currentPage === totalPages ? 'cursor-not-allowed opacity-40' : 'hover:bg-lightGray'}
        `}
      >
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
