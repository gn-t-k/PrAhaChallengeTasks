module.exports = (args) => {
  if (!args?.length) return "1 to 30 arguments can be set";
  const numbers = args.map((arg) => Number(arg));
  const numberPattern = /^[+,-]?([1-9]\d*|0)$/;
  return numbers.every((number) => numberPattern.test(number))
    ? numbers
    : "Only numbers are available";
};
