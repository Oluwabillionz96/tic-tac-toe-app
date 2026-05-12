import Board from "@/components/board";
import useGame from "@/hooks/use-game";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {
    state: { board, isXNext, winValues },
    stateSetter: { setBoard, setIsXNext },
    draw,
  } = useGame();

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
