import { squareStatus } from '../types';

type CalculateWinner = (status: squareStatus[]) => squareStatus;

export const useCalculateWinner: CalculateWinner = (status) => {
  const winPatternList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winPattern = winPatternList.find(
    ([first, second, third]) =>
      status[first] === status[second] &&
      status[second] === status[third] &&
      status[first] === status[third],
  );

  if (!winPattern) return null;

  return status[winPattern[0]];
};
