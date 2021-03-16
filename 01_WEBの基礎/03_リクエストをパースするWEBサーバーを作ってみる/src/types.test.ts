import { isError } from "./types";

describe("型を判定できるか", () => {
  it("Error型の場合", () => {
    const error = {
      message: "some message",
    };
    const expected = true;
    const actual = isError(error);

    expect(actual).toEqual(expected);
  });

  it("違う形のオブジェクトを渡した場合", () => {
    const error = {
      wrongProperty: "some message",
    };

    const expected = false;
    const actual = isError(error);

    expect(actual).toEqual(expected);
  });

  it("stringを渡した場合", () => {
    const error = "some message";

    const expected = false;
    const actual = isError(error);

    expect(actual).toEqual(expected);
  });

  it("nullを渡した場合", () => {
    const error = null;

    const expected = false;
    const actual = isError(error);

    expect(actual).toEqual(expected);
  });
});
