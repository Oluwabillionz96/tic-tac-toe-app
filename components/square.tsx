import { Text, TouchableOpacity } from "react-native";

const Square = ({
  index,
  value,
  handlePress,
  winValues,
  gameOver,
  disabled,
}: {
  value: "X" | "O" | null;
  handlePress: () => void;
  winValues?: number[];
  index: number;
  gameOver?: boolean;
  disabled: boolean;
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
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={handlePress}
      disabled={gameOver || winValues !== undefined}
    >
      <Text style={{ fontSize: 24 }}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Square;
