const getNumbers = require("./get-numbers");

describe("コマンドライン引数から数値を取得できる", () => {
  test("受け取った文字列を数値に変換できる", () => {
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
