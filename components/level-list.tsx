import { Dispatch, SetStateAction } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const levelData = [
  {
    label: "Easy",
    value: true,
    handlePress: (setIsEasy: Dispatch<SetStateAction<boolean>>) => {
      setIsEasy(true);
    },
  },
  {
    label: "Hard",
    value: false,
    handlePress: (setIsEasy: Dispatch<SetStateAction<boolean>>) => {
      setIsEasy(false);
    },
  },
];

const LevelList = ({
  setIsEasy,
  isEasy,
}: {
  setIsEasy: Dispatch<SetStateAction<boolean>>;
  isEasy: boolean;
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
            item.handlePress(setIsEasy);
          }}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default LevelList;
