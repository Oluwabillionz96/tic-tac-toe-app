import { ScrollView, View } from "react-native";
import ScoreRow from "./score-row";
import Indicator from "./indicator";
import Board from "./board";
import WinModal from "./win-modal";
import PlayerChoiceModal from "./player-choice-modal";
import ChoiceList from "./choice-list";
import LevelList from "./level-list";
import Button from "./button";
import useGameContext from "@/hooks/use-game-context";
import { getPlayerChoice } from "@/libs/utils";

const PlayScreen = () => {
  const {
    state: { isgameOn, winValues, board },
    stateSetter: { setBoard, setIsgameOn, setWinValues, setIsPlayerX },
  } = useGameContext();

  function reset() {
    setBoard(Array(9).fill(null));
    setIsgameOn(false);
    getPlayerChoice(setIsPlayerX);
    setWinValues(undefined);
  }

  const gameOver = winValues !== undefined || board.every((value) => value);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingInline: 24,
        paddingVertical: 16,
        gap: 24,
      }}
    >
      <ScoreRow />
      <Indicator />
      <View style={{ gap: 16 }}>
        <Board />
        {isgameOn && !gameOver && (
          <Button handlePress={reset} label="Restart" />
        )}
      </View>
      <WinModal reset={reset} />

      <PlayerChoiceModal>
        <ChoiceList />
        <LevelList />
      </PlayerChoiceModal>
    </ScrollView>
  );
};

export default PlayScreen;
