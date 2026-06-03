import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LEVELS = ["easy", "medium", "hard"] as const;

export default function DifficultySelector() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name="chart-simple" size={16} color="#4648D4" />
        <Text style={styles.title}>Difficulty</Text>
      </View>
      <View style={styles.row}>
        {LEVELS.map((level) => (
          <TouchableOpacity key={level} style={styles.button}>
            <Text style={styles.buttonLabel}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  title: {
    color: "#111C2D",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: "#DEE8FF",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonLabel: {
    textTransform: "capitalize",
  },
});
