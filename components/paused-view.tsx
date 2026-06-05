import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavLinks from "./nav-links";

export default function PausedView() {
  return (
    <View style={styles.container}>
      <View style={styles.iconRing}>
        <View style={styles.iconInner}>
          <Ionicons name="pause" size={36} color="#4648D4" />
        </View>
      </View>
      <Text style={styles.title}>Game Paused</Text>
      <Text style={styles.subtitle}>
        Take a break — your progress is safe
      </Text>
      <View style={styles.divider} />
      <Text style={styles.navLabel}>Jump to</Text>
      <NavLinks />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
    width: "100%",
  },
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    shadowColor: "#4648D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111C2D",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: "#7B7F8E",
    textAlign: "center",
    lineHeight: 20,
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#DEE4F0",
    marginVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7B7F8E",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
