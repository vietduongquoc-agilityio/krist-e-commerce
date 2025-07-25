'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface BreadcrumbProps {
  items: { name: string; href?: string }[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="py-20 text-center">
      <h1 className="text-[42px] font-secondary mb-4">
        {items[items.length - 1].name}
      </h1>
      <nav className="flex justify-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index !== 0 && (
                <ChevronRightIcon
                  className="h-4 w-4 mx-1 "
                  aria-hidden="true"
                />
              )}
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
