const REGEX_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
);

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const REGEX = {
  PASSWORD: REGEX_PASSWORD,
  EMAIL: REGEX_EMAIL,
};
