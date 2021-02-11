module.exports = (args) => {
  if (
    !(
      args?.[0] === "add" ||
      args?.[0] === "subtract" ||
      args?.[0] === "multiply" ||
      args?.[0] === "divide"
    )
  )
    return "Only add/subtract/multiply/divide is available";
  return args?.[0];
};
