module.exports = (args) => {
  const result = args.reduce((acc, cur) => acc * cur);
  return result > 1000 ? "big big number" : result;
};
