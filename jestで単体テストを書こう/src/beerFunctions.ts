import axios from "axios";
import { Beer, isBeer, isBeerList } from "./models/beer";

interface ResponseBeer {
  data: Beer;
}

interface ResponseBeerList {
  data: Beer[];
}

export const getRandomBeer = async (): Promise<Beer> => {
  const { data } = ((await axios.get(
    "https://random-data-api.com/api/beer/random_beer",
  )) as unknown) as ResponseBeer;

  if (!isBeer(data)) {
    throw Error("fail");
  }

  return data;
};

export const getRandomBeerList = async (size: number): Promise<Beer[]> => {
  const { data } = ((await axios.get(
    `https://random-data-api.com/api/beer/random_beer?size=${size}`,
  )) as unknown) as ResponseBeerList;

  if (!isBeerList(data)) {
    throw Error("fail");
  }

  return data;
};

export const filterPropertyRandomBeerList = (
  beerList: Beer[],
  property: keyof Beer,
): (number | string)[] => beerList.map((beer) => beer[property]);
