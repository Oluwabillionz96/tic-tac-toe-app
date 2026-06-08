// import React, { useEffect, useState } from "react";
// import { getLevel, getPlayerChoice, reset } from "@/libs/utils";
import PageWrapper from "@/components/page-wrapper";
import PlayerSymbolSelector from "@/components/player-symbol-selector";
import DifficultySelector from "@/components/difficulty-selector";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "@/components/button";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <PageWrapper>
      <View style={styles.section}>
        <Text style={styles.heading}>Game Preferences</Text>
        <View style={styles.cardGroup}>
          <PlayerSymbolSelector />
          <DifficultySelector />
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <Button style={{ backgroundColor: "#DC2C4F", borderRadius: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Feather name="refresh-cw" size={24} color="white" />
            <Text style={{ color: "white" }}>Reset All Scores</Text>
          </View>
        </Button>
        <Text style={{ fontSize: 10, color: "#767586" }}>
          This action will clear your lifetime wins and losses across all
          difficulties.
        </Text>
      </View>
      <View style={{ gap: 16 }}>
        <Text
          style={{ color: "#767586", fontWeight: "semibold", fontSize: 12 }}
        >
          Feedback &amp; Audio{" "}
        </Text>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: "#F0F3FF",
            padding: 8,
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              gap: 8,
              padding: 16,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <FontAwesome name="music" size={18} color="#4648D4" />
              <Text style={{ color: "#111C2D", fontSize: 16 }}>
                Sound Track
              </Text>
            </View>
            <TouchableOpacity>
              <Text>Button</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              gap: 8,
              padding: 16,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <Entypo name="sound-mix" size={18} color="#4648D4" />
              <Text style={{ color: "#111C2D", fontSize: 16 }}>
                Sound Effects
              </Text>
            </View>
            <TouchableOpacity>
              <Text>Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  section: {
    gap: 16,
  },
  heading: {
    color: "#767586",
    fontWeight: "600",
    fontSize: 12,
  },
  cardGroup: {
    backgroundColor: "#F0F3FF",
    borderRadius: 12,
    padding: 8,
    gap: 4,
  },
});
