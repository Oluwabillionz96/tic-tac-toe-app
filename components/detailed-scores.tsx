import { Scores } from "@/libs/types";
import { StyleSheet, Text, View } from "react-native";

export default function DetailedScores({
  gameScores,
}: {
  gameScores: Scores | null;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Detailed Scores Breakdown</Text>
      {Object.entries(gameScores ?? {}).map(([level, scores]) => (
        <View key={level} style={styles.card}>
          <Text style={styles.levelLabel}>{level}</Text>
          <View style={styles.row}>
            {Object.entries(scores).map(([key, value]) => {
              const label =
                key === "player" ? "Wins" : key === "computer" ? "Losses" : key;
              return (
                <View key={key} style={styles.statColumn}>
                  <Text style={[styles.statValue, { color: COLOR_MAP[key] }]}>
                    {value as number}
                  </Text>
                  <Text style={styles.statLabel}>{label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const COLOR_MAP: Record<string, string> = {
  player: "#4648D4",
  computer: "#B90538",
  draw: "#767586",
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 12,
    color: "#464554",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  levelLabel: {
    textTransform: "capitalize",
    color: "#111C2D",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
  statColumn: {
    borderLeftWidth: 1,
    borderColor: "#C7C4D7",
    paddingHorizontal: 15,
  },
  statValue: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    textAlign: "center",
    color: "#767586",
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "capitalize",
  },
});
