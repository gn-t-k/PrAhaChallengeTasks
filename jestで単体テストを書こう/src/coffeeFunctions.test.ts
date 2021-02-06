import axios, { AxiosInstance } from "axios";
import {
  getRandomCoffee,
  getRandomCoffeeList,
  filterPropertyRandomCoffeeList,
} from "./coffeeFunctions";
import { Coffee } from './models/coffee'

jest.mock("axios");

describe("getRandomCoffee", () => {
  test('外部サービスから取得したデータがCoffeeインターフェースを満たす場合、取得したオブジェクトを返すこと', async () => {
    const myAxios: jest.Mocked<AxiosInstance> = axios as unknown as jest.Mocked<AxiosInstance>;
    const responseData: Coffee = {
      id: 1,
      uid: "uid",
      blend_name: "blend_name",
      origin: "origin",
      variety: "variety",
      notes: "notes",
      intensifier: "intensifier"
    }
    myAxios.get.mockResolvedValue({
      data: responseData,
    });

    return getRandomCoffee().then((data): void => {
      expect(data).toBe(responseData);
    });
  });
  test('外部サービスから取得したデータがCoffeeインターフェースを満たさない場合、例外が発生すること', async () => {
    const myAxios: jest.Mocked<AxiosInstance> = axios as unknown as jest.Mocked<AxiosInstance>;
    const resonseData = {
      id: "1",
      uid: "uid",
      blend_name: "blend_name",
      origin: "origin",
      variety: "variety",
      notes: "notes",
      intensifier: "intensifier"
    }
    myAxios.get.mockResolvedValue({
      data: resonseData
    });

    const promise = getRandomCoffee()
    await expect(promise).rejects.toThrowError('fail')
  });
});

describe("getRandomCoffeeList", () => {
  test('外部サービスから取得したデータリストが全てCoffeeインターフェースを満たす場合、取得したデータのリストを返すこと', async () => {
    const myAxios: jest.Mocked<AxiosInstance> = axios as unknown as jest.Mocked<AxiosInstance>;
    const resonseData: Coffee[] =
      [
        {
          id: 1,
          uid: "uid1",
          blend_name: "blend_name1",
          origin: "origin1",
          variety: "variety1",
          notes: "notes1",
          intensifier: "intensifier1"
        },
        {
          id: 2,
          uid: "uid2",
          blend_name: "blend_name2",
          origin: "origin2",
          variety: "variety2",
          notes: "notes2",
          intensifier: "intensifier2"
        },
      ];

    myAxios.get.mockResolvedValue({
      data: resonseData
    });

    return getRandomCoffeeList(1).then((data): void => {
      expect(data).toBe(resonseData);
    });
  })
  test('外部サービスから取得したデータリストが1つでもCoffeeインターフェースを満たさない場合、例外を返すこと', async () => {
    const myAxios: jest.Mocked<AxiosInstance> = axios as unknown as jest.Mocked<AxiosInstance>;
    const resonseData =
      [
        {
          id: "1",
          uid: "uid1",
          blend_name: "blend_name1",
          origin: "origin1",
          variety: "variety1",
          notes: "notes1",
          intensifier: "intensifier1"
        },
        {
          id: 2,
          uid: "uid2",
          blend_name: "blend_name2",
          origin: "origin2",
          variety: "variety2",
          notes: "notes2",
          intensifier: "intensifier2"
        },
      ];

    myAxios.get.mockResolvedValue({
      data: resonseData
    });

    const promise = getRandomCoffeeList(2)
    await expect(promise).rejects.toThrowError('fail')
  })
});

describe("filterPropertyRandomCoffeeList", () => {
  test('指定したプロパティだけが抜き出されていること', () => {
    const coffeList: Coffee[] = [
      {
        id: 1,
        uid: "uid",
        blend_name: "blend_name",
        origin: "origin",
        variety: "variety",
        notes: "notes",
        intensifier: "intensifier"
      }
    ];
    expect(filterPropertyRandomCoffeeList(coffeList, "uid")).toStrictEqual(["uid"])
  })
});
