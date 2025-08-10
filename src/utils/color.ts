export const colorNameToHex: Record<string, string> = {
  Black: '#000000',
  Gray: '#808080',
  Red: '#FF0000',
  Yellow: '#FFFF00',
  'Coral Red': '#FF6C6C',
  'Orange Peel': '#FFA500',
  'Sun Yellow': '#FFD700',
  Lime: '#00FF00',
  'Neon Green': '#00FF00',
  'Mint Green': '#00FF7F',
  'Corn Flower': '#6495ED',
  'Medium Slate': '#7B68EE',
  Orchid: '#DA70D6',
  'Pink Lavender': '#E6E6FA',
};

export const colorHexToName = Object.fromEntries(
  Object.entries(colorNameToHex).map(([name, hex]) => [
    hex.toLowerCase(),
    name,
  ]),
);
