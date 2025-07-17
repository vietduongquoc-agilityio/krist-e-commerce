import { ConfigThemes } from '@heroui/react';

// Themes
import {
  backgroundLightMode,
  borderLightMode,
  colors,
  shadowLightMode,
  textLightMode,
} from './colors';

export const themes: ConfigThemes = {
  light: {
    colors: {
      ...colors,
      ...backgroundLightMode,
      ...textLightMode,
      ...borderLightMode,
      ...shadowLightMode,
    },
  },
};
