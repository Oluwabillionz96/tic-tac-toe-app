import Board from "@/components/board";
import { otherPlayerAlgorithm, wins } from "@/libs/utils";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const checkWin = useCallback(() => {
    for (const win of wins) {
      const [a, b, c] = win;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return win; // Return winning indices
      }
    }
    return undefined;
  }, [board]);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);

  useEffect(() => {
    setWinValues(checkWin());
  }, [checkWin]);

  const gameOver = winValues !== undefined || draw;

  useEffect(() => {
    if (!isXNext && !gameOver) {
      setTimeout(() => {
        otherPlayerAlgorithm(gameOver, isXNext, setIsXNext, board, setBoard);
      }, 1000);
    }
  }, [isXNext, board, gameOver]);
  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <Board
        isXNext={isXNext}
        setIsXNext={setIsXNext}
        setBoard={setBoard}
        board={board}
        winValues={winValues}
      />
      {(winValues || draw) && (
        <View style={{ flexDirection: "column" }}>
          <Text>
            {winValues
              ? `Game Over: ${board[winValues[0]]} Wins`
              : draw
                ? "Game Over: Draw"
                : null}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setBoard(Array(9).fill(null));
              setIsXNext(true);
            }}
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "black",
              height: 50,
              width: "100%",
            }}
          >
            <Text>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
