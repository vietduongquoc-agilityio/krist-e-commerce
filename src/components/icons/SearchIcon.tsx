import * as React from 'react';
import { SVGProps } from 'react';

export const IconSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="m17.877 16.485-4.268-4.268a.417.417 0 0 0-.299-.123h-.464A7.311 7.311 0 0 0 7.312 0 7.311 7.311 0 0 0 0 7.313a7.311 7.311 0 0 0 12.094 5.533v.464c0 .113.046.218.123.299l4.268 4.268a.422.422 0 0 0 .597 0l.795-.795a.422.422 0 0 0 0-.597ZM7.313 12.938a5.623 5.623 0 0 1-5.625-5.626 5.623 5.623 0 0 1 5.625-5.625 5.623 5.623 0 0 1 5.625 5.625 5.623 5.623 0 0 1-5.626 5.625Z"
        fill="#484848"
        stroke="#484848"
        strokeWidth={0.035}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18.001H0z" />
      </clipPath>
    </defs>
  </svg>
);
