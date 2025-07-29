import * as React from 'react';
import { SVGProps } from 'react';

export const IconShopping = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M17.922 6.269 16.34 1.525A1.496 1.496 0 0 0 14.919.5H5.08C4.434.5 3.862.912 3.66 1.525L2.08 6.269c-.05.153-.079.312-.079.475V15a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 18 15V6.744c0-.163-.025-.322-.078-.475ZM3 6.744c0-.053.01-.106.025-.16l1.581-4.743a.501.501 0 0 1 .475-.341H9.5v5.25H3v-.006ZM17 15c0 .275-.225.5-.5.5h-13A.501.501 0 0 1 3 15V7.75h14V15Zm0-8.25h-6.5V1.5h4.419c.215 0 .406.137.475.34l1.581 4.744c.016.05.025.104.025.16v.006Z"
        fill="#000"
        stroke="#000"
        strokeWidth={0.031}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h20v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
