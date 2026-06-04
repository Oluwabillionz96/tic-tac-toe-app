import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./button";
import useGameContext from "@/hooks/use-game-context";
import { saveLocalData } from "@/libs/utils";
import { usePathname, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

const PlayerChoiceModal = ({ children }: { children?: React.ReactNode }) => {
  const {
    state: { gameStatus, isPlayerX, gameLevel },
    stateSetter: { setIsPlayerX, setIsPlayersTurn, setGameStatus },
  } = useGameContext();

  const statusRef = useRef(gameStatus);
  if (gameStatus !== "ongoing") {
    statusRef.current = gameStatus;
  }

  const displayStatus = statusRef.current;

  const pathname = usePathname();
  const handleContinue: () => void = () => {
    if (gameStatus === "paused") {
      setGameStatus("ongoing");
      return;
    }

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
    setGameStatus("ongoing");
  };
  // const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (pathname !== "/play") {
      // setShowModal(false);
      if (gameStatus === "ongoing") {
        setGameStatus("paused");
      }
      // } else {
      //   // setShowModal(true);
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
      {/* Semi-transparent backdrop - works with Expo Go */}
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose Your side</Text>
            <TouchableOpacity
              onPress={() => {
                // setGameStatus("none");
                router.replace("/");
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <>
            {displayStatus === "none"
              ? children
              : displayStatus === "paused" && <Text>Game Paused</Text>}
          </>
          <Button handlePress={handleContinue}>
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
    gap: 32,
    // height: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#111C2D",
    textAlign: "center",
  },
});

export default PlayerChoiceModal;
