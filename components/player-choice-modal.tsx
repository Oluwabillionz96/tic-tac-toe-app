import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

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
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
  continueButton: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  continueButtonText: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default PlayerChoiceModal;
