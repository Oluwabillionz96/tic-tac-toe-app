import { GameLevel } from "@/libs/types";
import { Dispatch, SetStateAction } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";

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

const LevelList = ({
  setIsEasy,
  isEasy,
}: {
  setIsEasy: Dispatch<SetStateAction<GameLevel>>;
  isEasy: GameLevel;
}) => {
  return (
    <FlatList
      data={levelData}
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        // height: "40%",
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderStyle: "solid",
            padding: 10,
            width: "auto",
            backgroundColor: item.value === isEasy ? "red" : "transparent",
          }}
          onPress={() => {
            setIsEasy(item.value);
          }}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default LevelList;
