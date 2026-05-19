import { View } from "react-native";
import Square from "./square";
import { Dispatch, SetStateAction } from "react";

const Board = ({
  winValues,
  board,
  isPlayersTurn,
  setBoard,
  setIsPlayersTurn,
  isPlayerX,
}: {
  winValues?: number[];
  board: ("X" | "O" | null)[];
  isPlayersTurn: boolean;
  setBoard: Dispatch<SetStateAction<("X" | "O" | null)[]>>;
  setIsPlayersTurn: Dispatch<SetStateAction<boolean>>;
  isPlayerX: boolean | "random";
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
            if (isPlayersTurn) {
              if (!gameOver && !board[index]) {
                const newBoard = [...board];

                newBoard[index] = isPlayerX === true ? "X" : "O";

                setBoard(newBoard);
                setIsPlayersTurn(!isPlayersTurn);
              } else if (board[index]) {
                alert("Square already taken!");
              }
            }
          }}
          disabled={!isPlayersTurn}
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
