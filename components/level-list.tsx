import useGameContext from "@/hooks/use-game-context";
import { GameLevel } from "@/libs/types";
import { Text, View, TouchableOpacity } from "react-native";

const levelData: { label: string; value: GameLevel }[] = [
  {
    label: "Easy",
    value: "easy",
  },
  { label: "Medium", value: "medium" },
  {
    label: "Hard",
    value: "hard",
  },
];

const LevelList = () => {
  const {
    state: { gameLevel },
    stateSetter: { setGameLevel },
  } = useGameContext();
  return (
    <View style={{ gap: 8, width: "100%" }}>
      <Text
        style={{
          color: "#767586",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Difficulty
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#E7EEFF",
          padding: 4,
          borderRadius: 999,
        }}
      >
        {levelData.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={{
              padding: 10,
              flex: 1,
              alignItems: "center",
              ...(item.value === gameLevel
                ? {
                    backgroundColor: "#4648D4",
                    borderRadius: 999,
                  }
                : {}),
            }}
            onPress={() => {
              setGameLevel(item.value);
            }}
          >
            <Text
              style={{ color: item.value === gameLevel ? "white" : "#464554" }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LevelList;
