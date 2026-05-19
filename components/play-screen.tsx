import { View } from "react-native";
import ScoreRow from "./score-row";
import Indicator from "./indicator";
import Board from "./board";
import WinModal from "./win-modal";
import PlayerChoiceModal from "./player-choice-modal";
import ChoiceList from "./choice-list";
import LevelList from "./level-list";

const PlayScreen = () => {
  return (
    <View
      style={{
        paddingInline: 24,
        paddingVertical: 16,
        gap: 32,
      }}
    >
      <ScoreRow />
      <Indicator />
      <Board />
      <WinModal />

      <PlayerChoiceModal>
        <ChoiceList />
        <LevelList />
      </PlayerChoiceModal>
    </View>
  );
};

export default PlayScreen;
