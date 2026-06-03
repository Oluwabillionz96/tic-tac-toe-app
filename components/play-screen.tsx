import { ScrollView, View, Text } from "react-native";
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
import { Feather } from "@expo/vector-icons";
import PageWrapper from "./page-wrapper";
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
    <PageWrapper>
      <ScoreRow />
      <Indicator />
      <View style={{ gap: 16 }}>
        <Board />
        {isgameOn && !gameOver && (
          <Button
            handlePress={reset}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Feather name="refresh-cw" size={24} color="white" />
              <Text
                style={{
                  fontSize: 24,
                  color: "white",
                }}
              >
                Restart
              </Text>
            </View>
          </Button>
        )}
      </View>
      <WinModal reset={reset} />

      <PlayerChoiceModal>
        <ChoiceList />
        <LevelList />
      </PlayerChoiceModal>
    </PageWrapper>
  );
};

export default PlayScreen;
