import Board from "@/components/board";
import ChoiceList from "@/components/choice-list";
import Indicator from "@/components/indicator";
import LevelList from "@/components/level-list";
import PlayerChoiceModal from "@/components/player-choice-modal";
import ScoreRow from "@/components/score-row";
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
      scores: scoresValue,
      gameLevel,
    },
    stateSetter: {
      setBoard,
      setIsPlayersTurn,
      setIsPlayerX,
      setIsgameOn,
      setWinValues,
      SetGameLevel,
    },
    draw,
  } = useGame();

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";

  return (
    <View
      style={{
        paddingInline: 24,
        paddingVertical: 16,
        gap: 32,
      }}
    >
      <ScoreRow isPlayerX={isPlayerX as boolean} scoresValue={scoresValue} />
      <Indicator
        playerWins={winner === playerValue}
        winValues={winValues}
        draw={draw}
        isPlayersTurn={isPlayersTurn}
      />
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
          setIsPlayersTurn(isPlayerX === true);
          saveLocalData("level", JSON.stringify(gameLevel));
          setIsgameOn(true);
        }}
      >
        <ChoiceList setIsPlayerX={setIsPlayerX} isPlayerX={isPlayerX} />
        <LevelList setIsEasy={SetGameLevel} isEasy={gameLevel} />
      </PlayerChoiceModal>
    </View>
  );
}
