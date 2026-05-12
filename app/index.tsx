import Board from "@/components/board";
import ChoiceList from "@/components/choice-list";
import PlayerChoiceModal from "@/components/player-choice-modal";
import useGame from "@/hooks/use-game";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {
    state: { board, isXNext, winValues, isPlayerX, isModalVisible },
    stateSetter: { setBoard, setIsXNext, setIsPlayerX, setIsModalVisible },
    draw,
  } = useGame();

  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <Text>
        {winValues
          ? `Game Over: ${board[winValues[0]]} Wins`
          : draw
            ? "Game Over: Draw"
            : isXNext
              ? "Your Turn"
              : "Computer's turn"}
      </Text>
      <Board
        isXNext={isXNext}
        setIsXNext={setIsXNext}
        setBoard={setBoard}
        board={board}
        winValues={winValues}
        isPlayerX={isPlayerX}
      />
      {(winValues || draw) && (
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => {
              setBoard(Array(9).fill(null));
              setIsModalVisible(true);
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
      <PlayerChoiceModal
        isVisible={isModalVisible}
        handleContinue={() => {
          if (isPlayerX === "random") {
            setIsPlayerX(Math.floor(Math.random() * 2) === 1);
          }

          setIsModalVisible(false);
        }}
      >
        <ChoiceList setIsPlayerX={setIsPlayerX} isPlayerX={isPlayerX} />
      </PlayerChoiceModal>
    </View>
  );
}
