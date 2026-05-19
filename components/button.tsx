import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({
  handlePress,
  label,
  variant = "default",
}: {
  handlePress: () => void;
  label: string;
  variant?: "default" | "invert";
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...(variant === "invert" ? { backgroundColor: "#DEE8FF" } : {}),
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          ...styles.continueButtonText,
          ...(variant === "invert" ? { color: "#4648D4" } : {}),
        }}
      >
        {label}
      </Text>
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
