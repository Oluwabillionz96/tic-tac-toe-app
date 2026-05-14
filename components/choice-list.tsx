import { Dispatch, SetStateAction } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

type SetIsPlayerX = Dispatch<SetStateAction<boolean | "random">>;

const playerChoices = [
  {
    label: "X",
    value: true,
    handlePress: (setIsPlayerX: SetIsPlayerX) => {
      setIsPlayerX(true);
    },
  },
  {
    label: "O",
    value: false,
    handlePress: (setIsPlayerX: SetIsPlayerX) => {
      setIsPlayerX(false);
    },
  },
  {
    label: "Random",
    value: "random",
    handlePress: (setIsPlayerX: SetIsPlayerX) => {
      setIsPlayerX("random");
    },
  },
];

const ChoiceList = ({
  setIsPlayerX,
  isPlayerX,
}: {
  setIsPlayerX: SetIsPlayerX;
  isPlayerX: boolean | "random";
}) => {
  return (
    <FlatList
      data={playerChoices}
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        // height: "50%",
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            item.handlePress(setIsPlayerX);
          }}
          style={{
            borderWidth: 2,
            borderStyle: "solid",
            padding: 10,
            backgroundColor: item.value === isPlayerX ? "red" : "transparent",
          }}
        >
          <Text style={{ fontSize: 30 }}>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ChoiceList;
