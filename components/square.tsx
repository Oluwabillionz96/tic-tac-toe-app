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
        borderWidth: index % 2 === 1 ? 1 : 0,
        ...(index === 1 && { borderTopWidth: 0 }),
        ...(index === 3 && { borderLeftWidth: 0 }),
        ...(index === 5 && { borderRightWidth: 0 }),
        ...(index === 7 && { borderBottomWidth: 0 }),
        borderStyle: "solid",
        borderColor: "rgba(199,196,215, 0.3)",
        width: 91,
        height: 102,
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
