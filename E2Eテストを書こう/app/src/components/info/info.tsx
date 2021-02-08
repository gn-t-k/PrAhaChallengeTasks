import { FC } from 'react';
import { squareStatus } from '../../types';

export interface Props {
  history: squareStatus[][];
  changeHistory: (index: number) => void;
  isXNext: boolean;
  winner: squareStatus;
  isGameEnd: boolean;
}

export const Info: FC<Props> = ({
  history,
  changeHistory,
  isXNext,
  winner,
  isGameEnd,
}) => {
  const nextPlayer = isXNext ? 'X' : 'O';
  const gameStatus = winner
    ? `Winner: ${winner}`
    : isGameEnd
    ? 'Draw'
    : `Next player: ${nextPlayer}`;

  return (
    <>
      <div data-testid="game-status">{gameStatus}</div>
      {history.length > 1 && (
        <ol>
          {history.map((board, index) =>
            index === 0 ? null : (
              <li key={JSON.stringify(board)}>
                <button onClick={() => changeHistory(index)} type="button">
                  {index === 1
                    ? 'Go to game start'
                    : `Go to board #${index - 1}`}
                </button>
              </li>
            ),
          )}
        </ol>
      )}
    </>
  );
};
