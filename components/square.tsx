import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Square = ({
  value,
  handlePress,
}: {
  value: "X" | "O" | null;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        width: "33.3%",
        aspectRatio: 0.5,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={handlePress}
    >
      <Text style={{ fontSize: 24 }}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({});
