import { FC } from 'react';
import { Board } from '../board/board';
import { Info } from '../info/info';
import { squareStatus } from '../../types';
import { useCalculateWinner } from '../../hooks/useCalculateWinner';
import './game.css';

export interface Props {
  isXNext: boolean;
  status: squareStatus[];
  changeStatus: (index: number) => void;
  history: squareStatus[][];
  changeHistory: (index: number) => void;
}

export const Game: FC<Props> = ({
  isXNext,
  status,
  changeStatus,
  history,
  changeHistory,
}) => {
  const winner = useCalculateWinner(status);
  const isGameEnd = !!winner || status.every((s) => !!s);

  return (
    <div className="game">
      <div className="game-board">
        <Board {...{ status, changeStatus, isGameEnd }} />
      </div>
      <div className="game-info">
        <Info
          {...{
            history,
            changeHistory,
            isXNext,
            winner,
            isGameEnd,
          }}
        />
      </div>
    </div>
  );
};
