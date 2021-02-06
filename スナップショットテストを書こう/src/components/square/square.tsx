import { FC } from 'react';
import { squareStatus } from '../../types';
import './square.css';

export interface Props {
  value: squareStatus;
  onClick: () => void;
  isGameEnd: boolean;
}

export const Square: FC<Props> = ({ value, onClick, isGameEnd }) => (
  <button
    className="square"
    type="button"
    onClick={onClick}
    disabled={isGameEnd}
  >
    {value}
  </button>
);
