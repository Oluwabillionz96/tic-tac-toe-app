import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import Button from "./button";
import ModalHeader from "./modal-header";
import PausedView from "./paused-view";
import useGameContext from "@/hooks/use-game-context";
import { saveLocalData, updatePlayerChoice } from "@/libs/utils";
import { usePathname } from "expo-router";
import { useEffect } from "react";

const PlayerChoiceModal = ({ children }: { children?: React.ReactNode }) => {
  const {
    state: { gameStatus, isPlayerX, gameLevel },
    stateSetter: { setIsPlayerX, setIsPlayersTurn, setGameStatus },
  } = useGameContext();

  // const [status, setStatus] = useState(gameStatus);
  // if (gameStatus !== "ongoing") {
  //   setStatus(gameStatus);
  // }

  const displayStatus = gameStatus;
  const pathname = usePathname();

  const handleContinue = () => {
    if (gameStatus === "paused") {
      setGameStatus("ongoing");
      return;
    }

    updatePlayerChoice(setIsPlayerX);
    setIsPlayersTurn(isPlayerX === true);
    saveLocalData("level", JSON.stringify(gameLevel));
    setGameStatus("ongoing");
  };

  useEffect(() => {
    if (pathname !== "/play" && gameStatus === "ongoing") {
      setGameStatus("paused");
    }
  }, [pathname, gameStatus, setGameStatus]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={
        (gameStatus === "none" || gameStatus === "paused") &&
        pathname === "/play"
      }
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <ModalHeader
            title={
              displayStatus === "paused" ? "Game Paused" : "Choose Your Side"
            }
          />
          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.body}
            showsVerticalScrollIndicator={false}
          >
            {displayStatus === "none" ? children : <PausedView />}
          </ScrollView>
          <Button handlePress={handleContinue}>
            <Text style={styles.buttonText}>
              {displayStatus === "paused" ? "Continue" : "Start Game"}
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
    gap: 24,
  },
  bodyScroll: {
    flexShrink: 1,
  },
  body: {
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
});

export default PlayerChoiceModal;
