const getArguments = require("./get-arguments");

describe("コマンドライン引数から数値を取得できる", () => {
  test("受け取った文字列を数値に変換できる", () => {
    expect(getArguments(["1"])).toEqual([1]);
  });

  test("数値のみ取得する", () => {
    expect(getArguments(["a"])).toEqual("Only numbers are available");
  });

  test("複数取得できる", () => {
    expect(getArguments(["1", "2"])).toEqual([1, 2]);
  });

  test("1つでも数値以外のものがあった場合エラーを返す", () => {
    expect(getArguments(["1", "a", "3"])).toEqual("Only numbers are available");
  });

  test("何も渡されなかった場合エラーを返す", () => {
    expect(getArguments()).toEqual("1 to 30 arguments can be set");
  });
});
