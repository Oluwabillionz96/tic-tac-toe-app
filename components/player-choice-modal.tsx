import { View, Text, Modal, TouchableOpacity } from "react-native";

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
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      style={{ paddingInline: 24 }}
    >
      <View
        style={{
          position: "relative",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          // backdropFilter: "100px",
        }}
      >
        <View
          style={{
            paddingBlock: 10,
            height: "35%",
            position: "absolute",
            width: "100%",
            bottom: "32.5%",
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            paddingInline: 20,
            borderTopRightRadius: 15,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Choose Type</Text>
          </View>
          {children}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "grey",
              height: "20%",
            }}
            onPress={handleContinue}
          >
            <Text style={{ fontSize: 24, textAlign: "center" }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PlayerChoiceModal;
