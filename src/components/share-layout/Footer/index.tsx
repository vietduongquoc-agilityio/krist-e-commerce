'use client';

import { Navbar, NavbarContent } from '@heroui/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Text } from '@/components/commons';
import Input from '@/components/commons/Input';
import { Button } from '@/components/commons/Button';

// Constants
import { FOOTER_IMAGES, NAVITEMS } from '@/constants';

export const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="w-full items-center flex flex-col pt-36">
      <div className="flex justify-between gap-5 items-center">
        <figure>
          <Image
            src={FOOTER_IMAGES.LEFT}
            alt="Footer banner"
            width={360}
            height={747}
            sizes="(100vw - 20px) 100vw, 360px"
          />
        </figure>
        <div className="w-[631px] pt-22 flex flex-col items-center text-center">
          <h3 className="font-secondary text-[46px] text-charcoal mb-5">
            Subscribe To Our Newsletter
          </h3>
          <p className="text-gray mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin
          </p>
          <Input
            placeholder="michael@ymail.com"
            type="email"
            inputClassName="border-none px-8 py-[28px] text-[22px] cursor-not-allowed shadow-lg mb-8"
          />
          <Button
            variant="solid"
            className="w-[200px] cursor-not-allowed"
            disabled
          >
            Subscribe
          </Button>
        </div>

        <figure>
          <Image
            src={FOOTER_IMAGES.RIGHT}
            alt="Footer banner"
            width={357}
            height={747}
            sizes="(100vw - 20px) 100vw, 357px"
          />
        </figure>
      </div>
      <div className="w-full border-t border-lightGray mt-12 pt-7">
        <Navbar className="flex items-center w-[1282px] mx-auto">
          <Link href="/" className="text-4xl font-extrabold font-serif">
            FASCO
          </Link>

          <NavbarContent className="flex items-center justify-between w-[432px]">
            {NAVITEMS.map((item) => {
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
          </NavbarContent>
        </Navbar>
      </div>
      <Text className="text-xs pt-8 pb-5">
        Copyright © 2022 Xpro . All Rights Reseved.
      </Text>
    </footer>
  );
};
