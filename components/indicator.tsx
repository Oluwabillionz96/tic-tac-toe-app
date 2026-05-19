import { Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const Indicator = ({
  winValues,
  playerWins,
  draw,
  isPlayersTurn,
}: {
  winValues?: number[];
  playerWins: boolean;
  draw: boolean;
  isPlayersTurn: boolean;
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: 999,
      }}
    >
      <Entypo name="dot-single" size={35} color="#4648D4" />
      <Text
        style={{
          fontWeight: "semibold",
          fontSize: 18,
          color: "#4648D4",
        }}
      >
        {winValues
          ? `Game Over: ${playerWins ? "You" : "Computer"} Win${playerWins ? "" : "s"}`
          : draw
            ? "Game Over: Draw"
            : isPlayersTurn
              ? "Your Turn"
              : "Computer's turn"}
      </Text>
    </View>
  );
};

export default Indicator;
