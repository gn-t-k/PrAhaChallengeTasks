import { FC, useState } from 'react';
import { Game } from '../components/game/game';
import { useHandleBoard } from '../hooks/useHandleBoard';

export const TicTacToe: FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const {
    isXNext,
    setIsXNext,
    status,
    setStatus,
    changeStatus,
  } = useHandleBoard(history, setHistory);

  const changeHistory = (index: number) => {
    setHistory(history.slice(0, index));
    setStatus(history[index - 1]);
    setIsXNext(index % 2 === 0);
  };

  return (
    <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />
  );
};
