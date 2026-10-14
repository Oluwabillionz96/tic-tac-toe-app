import { View, Text } from "react-native";
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
    state: { gameStatus },
    stateSetter: { setBoard, setGameStatus, setWinValues, setIsPlayerX },
  } = useGameContext();

  function reset() {
    if (gameStatus === "paused") {
      setGameStatus("ongoing");
      return;
    }

    setBoard(Array(9).fill(null));
    setGameStatus("none");
    getPlayerChoice(setIsPlayerX);
    setWinValues(undefined);
  }

  return (
    <PageWrapper>
      <ScoreRow />
      <Indicator />
      <View style={{ gap: 16 }}>
        <Board />
        {gameStatus === "ongoing" && (
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
        <View style={{ gap: 32, width: "100%" }}>
          <ChoiceList />
          <LevelList />
        </View>
      </PlayerChoiceModal>
    </PageWrapper>
  );
};

export default PlayScreen;
