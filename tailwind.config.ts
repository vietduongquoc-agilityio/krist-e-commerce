// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

// Themes
import { themes } from './src/themes';
import {
  borderRadius,
  fontFamily,
  fontSize,
  lineHeight,
} from './src/themes/typography';
import { colors, themeColors } from './src/themes/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamily,
      fontSize: fontSize,
      borderRadius: borderRadius,
      lineHeight: lineHeight,
      themeColors: themeColors,
      animation: {
        'spinner-ease-spin': 'spinner-ease-spin 0.6s ease-in-out infinite',
        'spinner-linear-spin': 'spinner-linear-spin 0.6s linear infinite',
      },
      keyframes: {
        'spinner-ease-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'spinner-linear-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: themes,
      defaultTheme: 'light',
    }),
  ],
};

export default config;
