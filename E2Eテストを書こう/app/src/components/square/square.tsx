import { FC } from 'react';
import { squareStatus } from '../../types';
import './square.css';

export interface Props {
  index: number;
  value: squareStatus;
  onClick: () => void;
  isGameEnd: boolean;
}

export const Square: FC<Props> = ({ index, value, onClick, isGameEnd }) => (
  <button
    className="square"
    type="button"
    onClick={onClick}
    disabled={isGameEnd}
    data-testid={`square-${index}`}
  >
    {value}
  </button>
);
