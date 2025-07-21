import * as React from 'react';
import { SVGProps } from 'react';

export const IconAvatar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M13.5 11.875c-1.121 0-1.66.625-3.5.625s-2.375-.625-3.5-.625a5.251 5.251 0 0 0-5.25 5.25v1C1.25 19.16 2.09 20 3.125 20h13.75c1.035 0 1.875-.84 1.875-1.875v-1a5.251 5.251 0 0 0-5.25-5.25Zm3.375 6.25H3.125v-1A3.38 3.38 0 0 1 6.5 13.75c.57 0 1.496.625 3.5.625 2.02 0 2.926-.625 3.5-.625a3.38 3.38 0 0 1 3.375 3.375v1ZM10 11.25a5.626 5.626 0 0 0 5.625-5.625A5.626 5.626 0 0 0 10 0a5.626 5.626 0 0 0-5.625 5.625A5.626 5.626 0 0 0 10 11.25Zm0-9.375a3.756 3.756 0 0 1 3.75 3.75A3.756 3.756 0 0 1 10 9.375a3.756 3.756 0 0 1-3.75-3.75A3.756 3.756 0 0 1 10 1.875Z"
        fill="#484848"
        stroke="#484848"
        strokeWidth={0.039}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
