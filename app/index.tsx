import Board from "@/components/board";
import ChoiceList from "@/components/choice-list";
import PlayerChoiceModal from "@/components/player-choice-modal";
import useGame from "@/hooks/use-game";
import { saveLocalData } from "@/libs/utils";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {
    state: { board, isPlayersTurn, winValues, isPlayerX, isModalVisible },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsModalVisible,
    },
    draw,
    getPlayerChoice,
  } = useGame();

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";

  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text>You: </Text>
        <Text>Computer: </Text>
      </View>
      <Text>
        {winValues
          ? `Game Over: ${winner === playerValue ? "You" : "Computer"} Win${winner === playerValue ? "" : "s"}`
          : draw
            ? "Game Over: Draw"
            : isPlayersTurn
              ? "Your Turn"
              : "Computer's turn"}
      </Text>
      <Board
        isPlayersTurn={isPlayersTurn}
        setIsPlayersTurn={setIsPlayersTurn}
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
              getPlayerChoice();
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
          setIsPlayerX((value) => {
            if (value === "random") {
              saveLocalData("playerChoice", JSON.stringify("random"));
              return Math.floor(Math.random() * 2) === 1;
            } else {
              saveLocalData("playerChoice", JSON.stringify(value));
              return value;
            }
          });
          setIsModalVisible(false);
        }}
      >
        <ChoiceList setIsPlayerX={setIsPlayerX} isPlayerX={isPlayerX} />
      </PlayerChoiceModal>
    </View>
  );
}
