import axios from "axios";
import {
  getRandomBeer,
  getRandomBeerList,
  filterPropertyRandomBeerList,
} from "./beerFunctions";

/**
 * Random Data APIの/beer/random_beerからデータを取得する
 * ドキュメント： https://random-data-api.com/documentation
 */

const successMockData = {
  id: 371,
  uid: "59276967-fa41-4021-b7fd-450f2ed06f39",
  brand: "Pabst Blue Ribbon",
  name: "HopSlam Ale",
  style: "European Amber Lager",
  hop: "Tahoma",
  yeast: "2206 - Bavarian Lager",
  malts: "Munich",
  ibu: "70 IBU",
  alcohol: "9.3%",
  blg: "6.7°Blg",
};
const myAxios: jest.SpyInstance = jest.spyOn(axios, "get");
const failMockData = {};

describe("getRandomBeer", () => {
  /**
   * 単一のBeerオブジェクトを取得する
   */

  myAxios.mockResolvedValue({ data: successMockData });
  const successResult = getRandomBeer();
  test("非同期処理成功", () =>
    expect(successResult).resolves.toBe(successMockData));
  //

  myAxios.mockResolvedValue({ data: failMockData });
  const failResult = getRandomBeer();
  test("非同期処理失敗", () => expect(failResult).rejects.toThrow());
});

describe("getRandomBeerList", () => {
  /**
   * 複数のBeerオブジェクトを取得する
   */
  myAxios.mockResolvedValue({ data: [successMockData] });
  const successResult = getRandomBeerList(1);
  test("非同期処理成功", () =>
    expect(successResult).resolves.toStrictEqual([successMockData]));
  //
  myAxios.mockResolvedValue({ data: [failMockData] });
  const failResult = getRandomBeer();
  test("非同期処理失敗", () => expect(failResult).rejects.toThrow());
});

describe("filterPropertyRandomBeerList", () => {
  /**
   * 取得した複数のBeerから必要なプロパティだけを抜き出す
   */
  const successResult = filterPropertyRandomBeerList([successMockData], "id");
  test("非同期処理成功", () => expect(successResult).toStrictEqual([371]));
});
