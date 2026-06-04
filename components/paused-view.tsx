import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavLinks from "./nav-links";

export default function PausedView() {
  return (
    <View style={styles.pausedContainer}>
      <View style={styles.pauseIconWrap}>
        <Ionicons name="pause-circle" size={64} color="#4648D4" />
      </View>
      <Text style={styles.pausedTitle}>Game Paused</Text>
      <Text style={styles.pausedSubtitle}>
        Take a break — your game is saved
      </Text>
      <NavLinks />
    </View>
  );
}

const styles = StyleSheet.create({
  pausedContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  pauseIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  pausedTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111C2D",
  },
  pausedSubtitle: {
    fontSize: 14,
    color: "#7B7F8E",
    textAlign: "center",
  },
});
