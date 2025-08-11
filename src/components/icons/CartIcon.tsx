import * as React from 'react';
import { SVGProps } from 'react';

export const IconCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: 'middle' }}
    {...props}
  >
    <path
      d="M15 5c0-2.757-2.243-5-5-5S5 2.243 5 5H1.25v11.875C1.25 18.601 2.65 20 4.375 20h11.25c1.726 0 3.125-1.4 3.125-3.125V5H15Zm-5-3.125A3.129 3.129 0 0 1 13.125 5h-6.25A3.129 3.129 0 0 1 10 1.875Zm6.875 15c0 .69-.56 1.25-1.25 1.25H4.375c-.69 0-1.25-.56-1.25-1.25v-10H5v1.563a.937.937 0 1 0 1.875 0V6.875h6.25v1.563a.937.937 0 1 0 1.875 0V6.875h1.875v10Z"
      fill="#484848"
      stroke="#484848"
      strokeWidth={0.039}
    />
  </svg>
);
