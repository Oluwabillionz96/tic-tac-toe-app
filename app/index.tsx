import Board from "@/components/board";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const wins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

export default function Index() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const checkWin = useCallback(() => {
    const winner = wins.find((win) => {
      const value = [...new Set(win.map((index) => board[index]))];
      if (value[0] && value.length === 1) return value[0];
      return false;
    });

    return winner;
  }, [board]);
  const [winValues, setWinValues] = useState<number[] | undefined>(undefined);
  const draw = board.every((value) => value);

  useEffect(() => {
    setWinValues(checkWin());
  }, [checkWin]);
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
              height: 30,
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
