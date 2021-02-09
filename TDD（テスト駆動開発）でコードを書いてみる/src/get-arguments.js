module.exports = (args) => {
  const numbers = args.map((arg) => Number(arg));
  const numberPattern = /^[+,-]?([1-9]\d*|0)$/;
  return numbers.every((number) => numberPattern.test(number))
    ? numbers
    : "Only numbers are available";
};
