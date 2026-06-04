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
  handlePress?: () => void;
  children?: React.ReactNode;
  variant?: "default" | "invert";
  style?: StyleProp<ViewStyle>;
}) => {
  const propstyles = style as object;
  const buttonStyles = {
    ...styles.button,
    backgroundColor:
      variant === "invert" ? "#dee8ff" : styles.button.backgroundColor,
    ...propstyles,
  };

  console.log({ buttonStyles });
  return (
    <TouchableOpacity style={buttonStyles} onPress={handlePress}>
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
