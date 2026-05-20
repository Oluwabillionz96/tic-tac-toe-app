import useGameContext from "@/hooks/use-game-context";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const iconSize = 32;

const Square = ({
  index,
  value,
  handlePress,
}: {
  value: "X" | "O" | null;
  handlePress: () => void;
  index: number;
}) => {
  const {
    state: { board, winValues },
  } = useGameContext();
  const isWinningSquare = winValues?.includes(index);
  const backgroundColor = isWinningSquare
    ? board[index] === "X"
      ? "#4648D4"
      : "#B90538"
    : "transparent";

  const iconColor = isWinningSquare ? "#FFFFFF" : undefined;

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
      }}
      onPress={handlePress}
    >
      {value === "X" ? (
        <MaterialCommunityIcons
          name="window-close"
          size={iconSize}
          color={iconColor || "#4648D4"}
        />
      ) : value === "O" ? (
        <FontAwesome6
          name="circle"
          size={iconSize}
          color={iconColor || "#B90538"}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Square;
