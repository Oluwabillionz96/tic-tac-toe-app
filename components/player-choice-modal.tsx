import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./button";
import useGameContext from "@/hooks/use-game-context";
import { saveLocalData, updatePlayerChoice } from "@/libs/utils";
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

    updatePlayerChoice(setIsPlayerX);
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
            <Text style={styles.headerText}>
              {displayStatus === "paused" ? "Game Paused" : "Choose Your Side"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/");
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            {displayStatus === "none" ? (
              children
            ) : (
              <View style={styles.pausedContainer}>
                <View style={styles.pauseIconWrap}>
                  <Ionicons name="pause-circle" size={64} color="#4648D4" />
                </View>
                <Text style={styles.pausedTitle}>Game Paused</Text>
                <Text style={styles.pausedSubtitle}>
                  Take a break — your game is saved
                </Text>
                <View style={styles.navLinks}>
                  <TouchableOpacity
                    style={styles.navLink}
                    onPress={() => router.push("/(tabs)/stats")}
                  >
                    <Ionicons name="stats-chart-outline" size={20} color="#4648D4" />
                    <Text style={styles.navLinkText}>Statistics</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navLink}
                    onPress={() => router.push("/(tabs)/settings")}
                  >
                    <Ionicons name="settings-outline" size={20} color="#4648D4" />
                    <Text style={styles.navLinkText}>Settings</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
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
    fontWeight: "600",
  },
  body: {
    alignItems: "center",
  },
  pausedContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  pauseIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  pausedTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111C2D",
  },
  pausedSubtitle: {
    fontSize: 14,
    color: "#7B7F8E",
    textAlign: "center",
  },
  navLinks: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },
  navLinkText: {
    fontSize: 14,
    color: "#4648D4",
    fontWeight: "600",
  },
});

export default PlayerChoiceModal;
