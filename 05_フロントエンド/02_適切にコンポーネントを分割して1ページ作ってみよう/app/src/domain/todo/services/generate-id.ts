export const generateID = (): string =>
  (Math.floor(Math.random() * 90000) + 10000).toString();
