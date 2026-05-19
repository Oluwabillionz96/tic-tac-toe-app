import { View } from "react-native";
import Square from "./square";
import { Dispatch, SetStateAction } from "react";
import useGameContext from "@/hooks/use-game-context";

const Board = () => {
  const {
    state: { winValues, board, isPlayersTurn, isPlayerX },
    stateSetter: { setBoard, setIsPlayersTurn },
  } = useGameContext();
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
