import * as React from 'react';
import { SVGProps } from 'react';

export const IconScroll = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={57}
    height={57}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={56} height={56} rx={28} stroke="#000" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.5 42a.952.952 0 0 1-.668-.272.92.92 0 0 1-.276-.657v-21.9l-5.942 5.845a.954.954 0 0 1-1.337 0 .922.922 0 0 1 0-1.315l7.554-7.428A.944.944 0 0 1 28.5 16a.958.958 0 0 1 .669.273l7.554 7.428a.922.922 0 0 1 0 1.315.954.954 0 0 1-1.337 0l-5.942-5.844v21.9a.92.92 0 0 1-.276.656.952.952 0 0 1-.668.272Z"
      fill="#000"
    />
  </svg>
);
