import { useEffect, useState } from "react";

export type RepositoryData = {
  subscribers: number;
  stars: number;
};

export const useGetRepository = () => {
  const [data, setData] = useState<RepositoryData>({
    subscribers: 0,
    stars: 0,
  });

  useEffect(() => {
    const getRequest = async () => {
      const request = new Request(
        "https://api.github.com/repos/facebook/react"
      );

      const response = await fetch(request);

      const responseJson = response.json();

      return responseJson;
    };

    getRequest().then((response) => {
      setData({
        subscribers: response.subscribers_count,
        stars: response.stargazers_count,
      });
    });
  }, []);

  return data;
};
