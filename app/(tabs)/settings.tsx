import React, { useEffect } from "react";
import { reset } from "@/libs/utils";
import PageWrapper from "@/components/page-wrapper";
import PlayerSymbolSelector from "@/components/player-symbol-selector";
import DifficultySelector from "@/components/difficulty-selector";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
  useEffect(() => {
    reset();
  }, []);
  return (
    <PageWrapper>
      <View style={styles.section}>
        <Text style={styles.heading}>Game Preferences</Text>
        <View style={styles.cardGroup}>
          <PlayerSymbolSelector />
          <DifficultySelector />
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
