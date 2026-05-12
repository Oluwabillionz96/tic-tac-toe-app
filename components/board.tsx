import { View } from "react-native";
import Square from "./square";
import { Dispatch, SetStateAction } from "react";

const Board = ({
  winValues,
  board,
  isXNext,
  setBoard,
  setIsXNext,
}: {
  winValues?: number[];
  board: ("X" | "O" | null)[];
  isXNext: boolean;
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>;
  setIsXNext: Dispatch<SetStateAction<boolean>>;
}) => {
  const gameOver = winValues !== undefined || board.every((value) => value);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {board.map((item, index) => (
        <Square
          value={item}
          handlePress={() => {
            if (!gameOver && !board[index]) {
              const newBoard = [...board];
              if (isXNext) {
                newBoard[index] = "X";
              } else {
                newBoard[index] = "O";
              }
              setBoard(newBoard);
              setIsXNext(!isXNext);
            } else if (board[index]) {
              alert("Square already taken!");
            }
          }}
          index={index}
          winValues={winValues}
          gameOver={gameOver}
          key={index}
        />
      ))}
    </View>
  );
};

export default Board;
