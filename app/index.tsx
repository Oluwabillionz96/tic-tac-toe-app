import Board from "@/components/board";
import ChoiceList from "@/components/choice-list";
import LevelList from "@/components/level-list";
import PlayerChoiceModal from "@/components/player-choice-modal";
import useGame from "@/hooks/use-game";
import { getPlayerChoice, saveLocalData } from "@/libs/utils";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {
    state: {
      board,
      isPlayersTurn,
      winValues,
      isPlayerX,
      isgameOn,
      scores,
      isLevelEasy,
    },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsgameOn,
      setWinValues,
      setIsLevelEasy,
    },
    draw,
  } = useGame();

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";

  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text>You: {scores.player}</Text>
        <Text>Computer: {scores.computer} </Text>
        <Text>Draw: {scores.draw}</Text>
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
              setIsgameOn(false);
              getPlayerChoice(setIsPlayerX);
              setWinValues(undefined);
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
        isVisible={!isgameOn}
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

          saveLocalData("level", JSON.stringify(isLevelEasy));
          setIsgameOn(true);
        }}
      >
        <ChoiceList setIsPlayerX={setIsPlayerX} isPlayerX={isPlayerX} />
        <LevelList setIsEasy={setIsLevelEasy} isEasy={isLevelEasy} />
      </PlayerChoiceModal>
    </View>
  );
}
