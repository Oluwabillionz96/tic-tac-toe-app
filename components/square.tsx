import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Square = ({
  index,
  value,
  handlePress,
  winValues,
}: {
  value: "X" | "O" | null;
  handlePress: () => void;
  winValues?: number[];
  backgroundColor?: string;
  index: number;
}) => {
  const backgroundColor = winValues?.includes(index) ? "red" : "transparent";
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        width: "33.3%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
      }}
      onPress={handlePress}
      disabled={typeof winValues !== "undefined"}
    >
      <Text style={{ fontSize: 24 }}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({});
