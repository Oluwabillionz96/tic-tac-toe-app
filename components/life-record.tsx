import { ScoresValues } from "@/libs/types";
import { StyleSheet, Text, View } from "react-native";

export default function LifeRecord({
  totalScores,
}: {
  totalScores: ScoresValues;
}) {
  const total = totalScores.player + totalScores.computer + totalScores.draw;
  const percentage =
    total > 0 ? Math.round((totalScores.player / total) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lifetime Record</Text>
      <View style={styles.row}>
        {Object.keys(totalScores).map((playerId, indx) => (
          <View
            key={indx}
            style={[
              styles.statColumn,
              indx % 2 === 1 && styles.statColumnBordered,
            ]}
          >
            <Text
              style={[
                styles.scoreValue,
                playerId === "player"
                  ? styles.scoreWin
                  : playerId === "computer"
                    ? styles.scoreLoss
                    : styles.scoreDraw,
              ]}
            >
              {totalScores[playerId as keyof ScoresValues]}
            </Text>
            <Text style={styles.statLabel}>
              {playerId === "player"
                ? "Wins"
                : playerId === "computer"
                  ? "Losses"
                  : "Draws"}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.winRateSection}>
        <View style={styles.winRateHeader}>
          <Text style={styles.winRateLabel}>Win Rate</Text>
          <Text style={styles.winRateValue}>{percentage}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
  },
  title: {
    color: "#464554",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statColumn: {
    paddingHorizontal: 24,
  },
  statColumnBordered: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#C7C4D7",
  },
  scoreValue: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  scoreWin: {
    color: "#4648D4",
  },
  scoreLoss: {
    color: "#B90538",
  },
  scoreDraw: {
    color: "#767586",
  },
  statLabel: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#464554",
    textTransform: "uppercase",
  },
  winRateSection: {
    gap: 8,
  },
  winRateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  winRateLabel: {
    color: "#111C2D",
    fontWeight: "600",
    fontSize: 16,
  },
  winRateValue: {
    color: "#4648D4",
    fontWeight: "600",
    fontSize: 24,
  },
  progressTrack: {
    height: 12,
    backgroundColor: "#E7EEFF",
    borderRadius: 999,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4648D4",
    borderRadius: 999,
  },
});
