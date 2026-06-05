import Square from "./square";
import useGameContext from "@/hooks/use-game-context";
import { playSound } from "@/libs/sound";
import { FlatList } from "react-native";

const Board = () => {
  const {
    state: { gameStatus, board, isPlayersTurn, isPlayerX },
    stateSetter: { setBoard, setIsPlayersTurn },
  } = useGameContext();

  return (
    <FlatList
      data={board}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 24,
      }}
      renderItem={({ item, index }) => (
        <Square
          value={item}
          handlePress={() => {
            if (isPlayersTurn) {
              if (gameStatus === "ongoing" && !board[index]) {
                const newBoard = [...board];

                newBoard[index] = isPlayerX === true ? "X" : "O";

                setBoard(newBoard);
                playSound(require("@/assets/sounds/tap.wav"));
                setIsPlayersTurn(!isPlayersTurn);
              }
            }
          }}
          index={index}
          key={index}
        />
      )}
    />
  );
};

export default Board;
