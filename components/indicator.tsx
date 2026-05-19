import { Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const Indicator = ({ isPlayersTurn }: { isPlayersTurn: boolean }) => {
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
        {isPlayersTurn ? "Your Turn" : "Computer's turn"}
      </Text>
    </View>
  );
};

export default Indicator;
