import { ConfigThemes } from '@heroui/react';

// Themes
import {
  backgroundLightMode,
  borderLightMode,
  colors,
  shadowLightMode,
  textLightMode,
  themeColors,
} from './colors';

export const themes: ConfigThemes = {
  light: {
    colors: {
      ...colors,
      ...backgroundLightMode,
      ...textLightMode,
      ...borderLightMode,
      ...shadowLightMode,
      ...themeColors,
    },
  },
};
