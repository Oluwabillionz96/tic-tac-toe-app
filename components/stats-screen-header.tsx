import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

const StatsScreenHeader = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(70, 72, 212, 0.05)",
        paddingVertical: 18,
        paddingTop: 24,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Link href="/play" style={{ color: "#4648D4", fontSize: 16 }}>
          <Feather name="arrow-left" size={24} color="#4648D4" />
        </Link>
      </View>

      <View
        style={{
          flex: 2,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "semibold",
            color: "#4648D4",
            textAlign: "left",
            width: "100%",
          }}
        >
          Statistics
        </Text>
      </View>
    </View>
  );
};

export default StatsScreenHeader;
