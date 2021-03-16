import axios from "axios";
import { Coffee, isCoffee, isCoffeeList } from "./models/coffee";

interface ResponseCoffee {
  data: Coffee;
}

interface ResponseCoffeeList {
  data: Coffee[];
}

export const getRandomCoffee = async (): Promise<Coffee> => {
  const { data } = ((await axios.get(
    "https://random-data-api.com/api/coffee/random_coffee",
  )) as unknown) as ResponseCoffee;

  if (!isCoffee(data)) {
    throw Error("fail");
  }

  return data;
};

export const getRandomCoffeeList = async (size: number): Promise<Coffee[]> => {
  const { data } = ((await axios.get(
    `https://random-data-api.com/api/coffee/random_coffee?size=${size}`,
  )) as unknown) as ResponseCoffeeList;

  if (!isCoffeeList(data)) {
    throw Error("fail");
  }

  return data;
};

export const filterPropertyRandomCoffeeList = (
  coffeeList: Coffee[],
  property: keyof Coffee,
): (number | string)[] => coffeeList.map((coffee) => coffee[property]);
