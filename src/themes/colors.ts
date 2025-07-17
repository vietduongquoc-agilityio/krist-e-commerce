export const colors = {
  black: '#000000',
  primary: '#8A8A8A',
  secondary: '#484848',

  grey: '#9D9D9D',
  lightGray: '#DEDFE1',
  whiteSmoke: '#F3F3F3',

  orchid: '#B66CFF',
  red: '#FF0000',
  coralRed: '#FF6C6C',
  rosyPink: '#F8CCCC',
  pinkLavender: '#FC6CFF',
  mediumSlate: '#8A6CFF',
  cornFlower: '#6C7BFF',
  skyBlue: '#6CA7FF',
  aquaMint: '#6CF6FF',
  iceBlue: '#6CB9FF',
  mintGreen: '#6CFFDC',
  neonGreen: '#6CFF9E',
  lime: '#9BFF6C',
  sunYellow: '#FFF06C',
  tangerine: '#FF7629',
  orangePeel: '#FCA120',
};

export const backgroundLightMode = {
  customBackgrounds: {
    button: {
      100: colors.primary,
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
    placeholder: colors.secondary,
    description: {
      100: colors.lightGray,
      200: colors.whiteSmoke,
    },
    heading: colors.secondary,
    content: colors.mediumSlate,
    caption: colors.neonGreen,
    nav: colors.lightGray,
  },
};

export const borderLightMode = {
  border: {
    input: {
      100: colors.primary,
      200: colors.whiteSmoke,
    },
    brand: colors.lightGray,
  },
};

export const shadowLightMode = {
  shadow: {
    card: colors.secondary,
  },
};
