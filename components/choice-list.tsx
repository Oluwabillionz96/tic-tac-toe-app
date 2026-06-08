import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SymbolCard from "./symbol-card";
import useGameContext from "@/hooks/use-game-context";
import { View } from "react-native";

const iconSize = 24;

const playerChoices: {
  label: string;
  value: boolean | "random";
  icon: React.ReactNode;
}[] = [
  {
    label: "First",
    value: true,
    icon: (
      <MaterialCommunityIcons
        name="window-close"
        size={iconSize}
        color="#4648D4"
      />
    ),
  },
  {
    label: "Second",
    value: false,
    icon: <FontAwesome6 name="circle" size={iconSize} color="#B90538" />,
  },
  {
    label: "Random",
    value: "random",
    icon: <FontAwesome name="random" size={iconSize} color="#464554" />,
  },
];

const ChoiceList = () => {
  const {
    state: { isPlayerX },
    stateSetter: { setIsPlayerX },
  } = useGameContext();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 10,
          // height: "50%",
        }}
      >
        {playerChoices.map((item, indx) => (
          <SymbolCard
            key={indx}
            icon={item.icon}
            label={item.label}
            isSelected={item.value === isPlayerX}
            handlePress={() => {
              setIsPlayerX(item.value);
            }}
          />
        ))}
      </View>
    </>
  );
};

export default ChoiceList;
