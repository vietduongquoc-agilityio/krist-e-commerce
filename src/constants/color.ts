import { colorNameToHex } from '@/utils';

export const colorHexToName: Record<string, string> = Object.fromEntries(
  Object.entries(colorNameToHex).map(([key, value]) => [value, key]),
);
