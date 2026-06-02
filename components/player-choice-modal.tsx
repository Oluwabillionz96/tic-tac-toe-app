import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./button";
import useGameContext from "@/hooks/use-game-context";
import { saveLocalData } from "@/libs/utils";
import { usePathname, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PlayerChoiceModal = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isgameOn, isPlayerX, gameLevel },
    stateSetter: { setIsPlayerX, setIsPlayersTurn, setIsgameOn },
  } = useGameContext();
  const pathname = usePathname();
  const handleContinue = () => {
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
  };

  if (pathname !== "/play") {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible={!isgameOn}>
      {/* Semi-transparent backdrop - works with Expo Go */}
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose Your side</Text>
            <TouchableOpacity
              onPress={() => {
                setIsgameOn(false);
                router.replace("/");
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {children}
          <Button handlePress={handleContinue}>
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
              Start Game
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
