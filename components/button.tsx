import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const Button = ({
  handlePress,
  children,
  variant = "default",
  style,
}: {
  handlePress: () => void;
  children: React.ReactNode;
  variant?: "default" | "invert";
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...(variant === "invert" ? { backgroundColor: "#DEE8FF" } : {}),
        ...{ style },
      }}
      onPress={handlePress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: "#4648D4",
  },
  continueButtonText: { fontSize: 24, textAlign: "center", color: "white" },
});
