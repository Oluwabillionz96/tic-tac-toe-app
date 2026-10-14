import useAppContext from "@/hooks/use-app-context";
import { updatePlayerChoice } from "@/libs/utils";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ICON_SIZE = 20;

const SYMBOLS = ["X", "O", "Random"] as const;

function SymbolIcon({ symbol, color }: { symbol: string; color: string }) {
  if (symbol === "X") {
    return (
      <MaterialCommunityIcons
        name="window-close"
        size={ICON_SIZE}
        color={color}
      />
    );
  }
  if (symbol === "O") {
    return <FontAwesome6 name="circle" size={ICON_SIZE} color={color} />;
  }
  return <FontAwesome name="random" size={ICON_SIZE} color={color} />;
}

export default function PlayerSymbolSelector() {
  const {
    state: { isPlayerX: playerChoice, gameStatus, hasSoundEffect },
    stateSetters: { setIsPlayerX },
  } = useAppContext();
  const selectedSymbol =
    playerChoice === true ? "X" : playerChoice === "random" ? "Random" : "O";
  return (
    <View style={styles.row}>
      <View style={styles.labelWrap}>
        <Feather name="user" size={16} color="#4648D4" />
        <Text style={styles.label}>Player Symbol</Text>
      </View>
      <View style={styles.toggle}>
        {SYMBOLS.map((symbol) => {
          const isSelected = symbol === selectedSymbol;
          return (
            <TouchableOpacity
              key={symbol}
              style={[
                styles.option,
                { backgroundColor: isSelected ? "#4648D4" : "transparent" },
              ]}
              onPress={() => {
                updatePlayerChoice(
                  setIsPlayerX,
                  hasSoundEffect,
                  symbol === "X" ? true : symbol === "O" ? false : "random",
                  gameStatus === "paused",
                );
              }}
            >
              <SymbolIcon
                symbol={symbol}
                color={isSelected ? "white" : "#C7C4D7"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 8,
    paddingInline: 16,
    paddingVertical: 28,
    alignItems: "center",
  },
  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    color: "#111C2D",
    fontSize: 16,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#E7EEFF",
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  option: {
    padding: 5,
    borderRadius: 999,
  },
});
