export const colors = {
  // Grayscale
  black: '#000000',
  white: '#FFFFFF',
  gray: '#9D9D9D',
  charcoal: '#484848',
  lightGray: '#DEDFE1',
  whiteSmoke: '#F3F3F3',

  // Red tones
  red: '#FF0000',
  coralRed: '#FF6C6C',
  rosyPink: '#F8CCCC',

  // Purple tones
  orchid: '#B66CFF',
  pinkLavender: '#FC6CFF',
  mediumSlate: '#8A6CFF',

  // Blue tones
  cornFlower: '#6C7BFF',
  skyBlue: '#6CA7FF',
  aquaMint: '#6CF6FF',
  iceBlue: '#6CB9FF',

  // Green tones
  mintGreen: '#6CFFDC',
  neonGreen: '#6CFF9E',
  lime: '#9BFF6C',

  // Yellow / Orange tones
  sunYellow: '#FFF06C',
  tangerine: '#FF7629',
  orangePeel: '#FCA120',
};

// Theme-based alias
export const themeColors = {
  primary: colors.charcoal, // '#484848'
  secondary: colors.gray, // '#9D9D9D'
};

export const backgroundLightMode = {
  customBackgrounds: {
    button: {
      100: themeColors.primary,
      200: colors.rosyPink,
    },
    icon: {
      100: colors.cornFlower,
      200: colors.aquaMint,
      300: colors.skyBlue,
    },
    lesson: {
      100: colors.iceBlue,
      200: colors.tangerine,
      300: colors.coralRed,
    },
  },
};

export const textLightMode = {
  customColor: {
    label: colors.black,
    placeholder: themeColors.secondary,
    description: {
      100: colors.lightGray,
      200: colors.whiteSmoke,
    },
    heading: themeColors.secondary,
    content: colors.mediumSlate,
    caption: colors.neonGreen,
    nav: colors.lightGray,
  },
};

export const borderLightMode = {
  border: {
    input: {
      100: themeColors.primary,
      200: colors.whiteSmoke,
    },
    brand: colors.lightGray,
  },
};

export const shadowLightMode = {
  shadow: {
    card: themeColors.secondary,
  },
};
