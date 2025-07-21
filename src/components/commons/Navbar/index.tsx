'use client';

// Libs
import { Navbar as HeroNavbar, NavbarItem } from '@heroui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants/router';

interface CustomNavbarItemClassName {
  baseClass?: string;
  activeClass?: string;
  inactiveClass?: string;
}

interface INavbar {
  navbarList: { text: string; path: string }[];
  className?: CustomNavbarItemClassName;
}

export const Navbar = ({ navbarList, className }: INavbar) => {
  const pathname = usePathname();

  const baseClass =
    className?.baseClass || 'text-xl-22 leading-[100%] hover:text-gray';
  const activeClass = className?.activeClass || 'font-semibold text-charcoal';
  const inactiveClass = className?.inactiveClass || 'text-gray';

  const getItemClass = (path: string): string => {
    const isActive = pathname === path;
    const isRootPath = pathname === ROUTER.HOME;
    const isHomeItem = path === ROUTER.HOME;

    const conditionalClass = isActive
      ? activeClass
      : isRootPath && !isHomeItem
        ? 'text-charcoal'
        : inactiveClass;

    return `${baseClass} ${conditionalClass}`;
  };

  return (
    <HeroNavbar className="list-none">
      {navbarList.map(({ text, path }) => {
        return (
          <NavbarItem key={text}>
            <Link href={path} className={getItemClass(path)}>
              {text}
            </Link>
          </NavbarItem>
        );
      })}
    </HeroNavbar>
  );
};
