import { checkWin, getLocalData, otherPlayerAlgorithm } from "@/libs/utils";
import { useEffect, useState } from "react";

const useGame = () => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const gameOver = winValues !== undefined || draw;

  async function getPlayerChoice() {
    const playerChoice = await getLocalData("playerChoice");
    if (playerChoice) {
      try {
        const parsed = JSON.parse(playerChoice);
        // Validate that parsed value is valid
        if (parsed === true || parsed === false || parsed === "random") {
          setIsPlayerX(parsed);
        }
      } catch (error) {
        console.error("Error parsing player choice from localStorage:", error);
      }
    }
  }

  useEffect(() => {
    getPlayerChoice();
  }, []);

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

    // return () => setWinValues(undefined);
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
    getPlayerChoice,
  };
};

export default useGame;
