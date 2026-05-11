import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Square from "./square";

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

const Board = () => {
  const [game, setGame] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const checkWin = useCallback(() => {
    const winner = wins.find((win) => {
      const value = [...new Set(win.map((index) => game[index]))];
      if (value[0] && value.length === 1) return value[0];
      return false;
    });

    return winner;
  }, [game]);
  const [isXNext, setIsXNext] = useState(true);

  const annouceWinner = useCallback(() => {
    const winner = checkWin();
    if (winner || game.every((value) => value)) {
      if (winner) {
        alert(`Game Over: ${game[winner[0]]} wins `);
      } else {
        alert("Game Over: Draw");
      }
      setGame(Array(9).fill(null));
      setIsXNext(true);
    }
  }, [checkWin, game]);

  useEffect(() => {
    annouceWinner();
  }, [annouceWinner]);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {game.map((item, index) => (
        <Square
          value={item}
          handlePress={() => {
            if (!game[index]) {
              const newBoard = [...game];
              if (isXNext) {
                newBoard[index] = "X";
              } else {
                newBoard[index] = "O";
              }
              setGame(newBoard);
              setIsXNext(!isXNext);
            } else {
              alert("Value");
            }
          }}
          key={index}
        />
      ))}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({});
