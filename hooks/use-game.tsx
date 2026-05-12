import { checkWin, otherPlayerAlgorithm } from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);

  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const gameOver = winValues !== undefined || draw;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isPlayersTurn && !gameOver && !isModalVisible) {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(
          isPlayersTurn,
          setIsPlayersTurn,
          board,
          setBoard,
          isPlayerX,
        );
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlayersTurn, board, gameOver, isPlayerX, isModalVisible]);

  useEffect(() => {
    setWinValues(checkWin(board));
  }, [board]);

  // Update isPlayersTurn when isPlayerX changes from "random" to boolean
  useEffect(() => {
    if (isPlayerX !== "random") {
      setIsPlayersTurn(isPlayerX);
    }
  }, [isPlayerX]);
  return {
    state: { board, isPlayersTurn, winValues, isPlayerX, isModalVisible },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsModalVisible,
    },
    draw,
  };
};

export default useGame;
