import { checkWin, otherPlayerAlgorithm } from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);
  const gameOver = winValues !== undefined || draw;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isXNext && !gameOver) {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(isXNext, setIsXNext, board, setBoard);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isXNext, board, gameOver]);

  useEffect(() => {
    setWinValues(checkWin(board));
  }, [board]);
  return {
    state: { board, isXNext, winValues },
    stateSetter: { setBoard, setIsXNext },
    draw,
  };
};

export default useGame;
