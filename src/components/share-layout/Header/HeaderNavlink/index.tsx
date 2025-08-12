import Link from 'next/link';

interface NavItem {
  text: string;
  path: string;
}

interface HeaderNavLinksProps {
  pathname: string;
  navItems: NavItem[];
}

export const HeaderNavLinks = ({ pathname, navItems }: HeaderNavLinksProps) => {
  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.text}
            href={item.path}
            className={`transition-colors ${
              isActive
                ? 'text-black font-semibold text-lg'
                : 'text-charcoal hover:text-black'
            }`}
          >
            {item.text}
          </Link>
        );
      })}
    </>
  );
};
