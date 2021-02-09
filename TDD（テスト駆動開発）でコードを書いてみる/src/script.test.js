const { TestScheduler } = require("jest");
const getArguments = require("./get-arguments");

describe("コマンドライン引数から数値を取得できる", () => {
  test("受け取った文字列を数値に変換できる", () => {
    expect(getArguments(["1"])).toStrictEqual([1]);
  });
});
