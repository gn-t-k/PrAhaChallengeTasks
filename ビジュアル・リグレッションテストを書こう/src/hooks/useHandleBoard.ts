import { useState, Dispatch, SetStateAction } from 'react';
import { squareStatus } from '../types';

type HandleBoard = (
  history: squareStatus[][],
  setHistory: Dispatch<SetStateAction<squareStatus[][]>>,
) => {
  isXNext: boolean;
  setIsXNext: Dispatch<SetStateAction<boolean>>;
  status: squareStatus[];
  setStatus: Dispatch<SetStateAction<squareStatus[]>>;
  changeStatus: (index: number) => void;
};

export const useHandleBoard: HandleBoard = (history, setHistory) => {
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState<squareStatus[]>(Array(9).fill(null));

  const changeTurn = () => {
    setIsXNext(!isXNext);
  };
  const changeStatus = (index: number) => {
    if (status[index] !== null) return;
    const nextBoard = status.map((s, i) => {
      if (i !== index) return s;

      return isXNext ? 'X' : 'O';
    });
    setStatus(nextBoard);
    setHistory(history.concat([nextBoard]));
    changeTurn();
  };

  return { isXNext, setIsXNext, status, setStatus, changeStatus };
};
