import React, { useEffect, useState } from "react";
import { getLevel, getPlayerChoice, reset } from "@/libs/utils";
import PageWrapper from "@/components/page-wrapper";
import PlayerSymbolSelector from "@/components/player-symbol-selector";
import DifficultySelector from "@/components/difficulty-selector";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/button";
import { Feather } from "@expo/vector-icons";

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
