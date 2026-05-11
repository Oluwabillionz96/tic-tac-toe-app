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
            if (!board[index]) {
              const newBoard = [...board];
              if (isXNext) {
                newBoard[index] = "X";
              } else {
                newBoard[index] = "O";
              }
              setBoard(newBoard);
              setIsXNext(!isXNext);
            } else {
              alert("Value");
            }
          }}
          index={index}
          winValues={winValues}
          key={index}
        />
      ))}
    </View>
  );
};

export default Board;
