import { FC } from 'react';
import { Square } from '../square/square';
import { squareStatus } from '../../types';
import './board.css';

export interface Props {
  status: squareStatus[];
  changeStatus: (index: number) => void;
  isGameEnd: boolean;
}

export const Board: FC<Props> = ({ status, changeStatus, isGameEnd }) => (
  <div>
    {[0, 1, 2].map((i) => (
      <div className="board-row" key={i}>
        {[0, 1, 2, 3].map((j) => {
          const index = 4 * i + j;

          return (
            <Square
              value={status[index]}
              onClick={() => changeStatus(index)}
              isGameEnd={isGameEnd}
              key={index}
            />
          );
        })}
      </div>
    ))}
  </div>
);
