import { otherPlayerAlgorithm } from "@/libs/algorithm";
import { updateGames } from "@/libs/games";
import { getScores, updateScores } from "@/libs/scores";
import { GameLevel, GameStatus, ScoresValues } from "@/libs/types";
import { checkWin, getPlayerChoice } from "@/libs/utils";
import { useAudioPlayer } from "expo-audio";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useGame = (
  isPlayerX: boolean | "random",
  setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>,
  gameStatus: GameStatus,
  setGameStatus: Dispatch<SetStateAction<GameStatus>>,
  gameLevel: GameLevel,
  setGameLevel: Dispatch<SetStateAction<GameLevel>>,
) => {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isPlayersTurn, setIsPlayersTurn] = useState(isPlayerX === true);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = winValues === undefined && board.every((value) => value);
  const [scores, setScores] = useState<ScoresValues>({
    player: 0,
    draw: 0,
    computer: 0,
  });
  const player = useAudioPlayer(require("@/assets/sounds/tap.wav"));

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getScores("set", setScores);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isPlayersTurn && gameStatus === "ongoing") {
      timeoutId = setTimeout(() => {
        otherPlayerAlgorithm(
          isPlayersTurn,
          setIsPlayersTurn,
          board,
          setBoard,
          isPlayerX,
          gameLevel,
          () => {
            player.seekTo(0);
            player.play();
          },
        );
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlayersTurn, board, isPlayerX, gameStatus, gameLevel, player]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const newWinValues = checkWin(board);
      (() => {
        setWinValues(newWinValues);
      })();

      // Update scores in the same effect after winValues is calculated
      const isDraw =
        board.every((value) => value) && newWinValues === undefined;
      const hasWinner = newWinValues !== undefined;

      if (isDraw || hasWinner) {
        setGameStatus("ended");
        updateScores(setScores, board, isPlayerX, gameLevel, newWinValues);
        updateGames(board, gameLevel, newWinValues);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [board, isPlayerX, setScores, setGameStatus, gameLevel]);

  // Update isPlayersTurn when isPlayerX changes from "random" to boolean
  useEffect(() => {
    if (isPlayerX !== "random") {
      (() => {
        setIsPlayersTurn(isPlayerX);
      })();
    }
  }, [isPlayerX, winValues]);

  return {
    state: {
      board,
      isPlayersTurn,
      winValues,
      gameStatus,
      scores,
      isPlayerX,
      gameLevel,
    },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setGameStatus,
      setScores,
      setIsPlayerX,
      setWinValues,
      setGameLevel,
    },
    draw,
    getPlayerChoice,
  };
};

export default useGame;
