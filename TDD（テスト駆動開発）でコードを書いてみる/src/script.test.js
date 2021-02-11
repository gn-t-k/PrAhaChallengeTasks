const getNumbers = require("./get-numbers");
const getOperation = require("./get-operation");
const add = require("./add");
const subtract = require("./subtract");

describe("受け取った文字列を数値に変換できる", () => {
  test("文字列を数値に変換する", () => {
    expect(getNumbers(["1"])).toEqual([1]);
  });

  test("数値のみ取得する", () => {
    expect(getNumbers(["a"])).toEqual("Only numbers are available");
  });

  test("複数取得できる", () => {
    expect(getNumbers(["1", "2"])).toEqual([1, 2]);
  });

  test("1つでも数値以外のものがあった場合エラーを返す", () => {
    expect(getNumbers(["1", "a", "3"])).toEqual("Only numbers are available");
  });

  test("何も渡されなかった場合エラーを返す", () => {
    expect(getNumbers()).toEqual("1 to 30 arguments can be set");
  });

  test("31個以上の引数が渡された場合、エラーを返す", () => {
    expect(getNumbers(Array(31).fill(1))).toEqual(
      "1 to 30 arguments can be set"
    );
  });
});

describe("受け取った配列から四則演算の種類を取得する", () => {
  test("配列の先頭を取得する", () => {
    expect(getOperation(["add", "1", "2"])).toEqual("add");
  });

  test("add/subtract/multiply/devideのみを受け取る", () => {
    expect(getOperation(["square", "1", "2"])).toEqual(
      "Only add/subtract/multiply/devide is available"
    );
  });
});

describe("add", () => {
  test("受け取った数値を全て加算して返す", () => {
    expect(add([1, 2, 3])).toEqual(6);
  });

  test("計算結果が1000を超える場合は文字列'too big'を返す", () => {
    expect(add([1000, 1])).toEqual("too big");
  });
});

describe("subtract", () => {
  test("受け取った数値を全て減算して返す", () => {
    expect(subtract([3, 2])).toEqual(1);
  });
});
