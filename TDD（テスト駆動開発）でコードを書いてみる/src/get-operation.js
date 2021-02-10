module.exports = (args) => {
  if (
    !(
      args?.[0] === "add" ||
      args?.[0] === "subtract" ||
      args?.[0] === "multiply" ||
      args?.[0] === "devide"
    )
  )
    return "Only add/subtract/multiply/devide is available";
  return args?.[0];
};
