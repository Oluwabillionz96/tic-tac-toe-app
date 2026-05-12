import { checkWin, otherPlayerAlgorithm } from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [isXNext, setIsXNext] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const gameOver = winValues !== undefined || draw;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isXNext && !gameOver && !isModalVisible) {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(isXNext, setIsXNext, board, setBoard, isPlayerX);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isXNext, board, gameOver, isPlayerX, isModalVisible]);

  useEffect(() => {
    setWinValues(checkWin(board));
  }, [board]);
  return {
    state: { board, isXNext, winValues, isPlayerX, isModalVisible },
    stateSetter: { setBoard, setIsXNext, setIsPlayerX, setIsModalVisible },
    draw,
  };
};

export default useGame;
