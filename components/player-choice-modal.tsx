import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Button from "./button";

const PlayerChoiceModal = ({
  handleContinue,
  isVisible,
  children,
}: {
  handleContinue: () => void;
  isVisible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      {/* Semi-transparent backdrop - works with Expo Go */}
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose Your side</Text>
          </View>
          {children}
          <Button handlePress={handleContinue} label="Start Game" />
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
    width: "100%",
    // marginBottom: 32,
  },
});

export default PlayerChoiceModal;
