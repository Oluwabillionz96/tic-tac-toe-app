import { getGameCounts } from "@/libs/games";
import { Scores, GameCounts } from "@/libs/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

const ICONS: Record<string, string> = {
  easy: "face-grin-tongue-squint",
  medium: "face-smile-beam",
  hard: "face-sad-tear",
};

const LEVEL_COLORS: Record<string, string> = {
  easy: "#4648D4",
  medium: "#4648D4",
  hard: "#B90538",
};

export default function PerformanceCard({
  gameScores,
}: {
  gameScores: Scores | null;
}) {
  const [gameCounts, setGameCounts] = useState<GameCounts | null>();

  useEffect(() => {
    let mounted = true;
    getGameCounts()
      .then((counts) => {
        if (mounted) {
          setGameCounts(counts);
        }
      })
      .catch((error) => console.log("error"))
      .finally(() => {
        mounted = false;
      });

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Performance By Difficulty</Text>
      <View style={styles.list}>
        {gameScores &&
          Object.keys(gameScores).map((level) => {
            const score = gameScores[level as keyof Scores];
            const fraction =
              score.player /
              (gameCounts ? gameCounts?.[level as keyof GameCounts] : 0);
            const percentage = Math.round((fraction ? fraction : 0) * 100);
            const color = LEVEL_COLORS[level];

            return (
              <View key={level} style={styles.card}>
                <View style={styles.left}>
                  <View style={styles.iconWrap}>
                    <FontAwesome6 name={ICONS[level]} size={18} color={color} />
                  </View>
                  <View>
                    <Text style={styles.levelName}>{level}</Text>
                    <Text style={styles.gameCount}>
                      {gameCounts?.[level as keyof GameCounts]} Games
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.percentage, { color }]}>
                    {percentage}%
                  </Text>
                  <Text style={styles.successLabel}>Success</Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#111C2D",
    fontWeight: "600",
    fontSize: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  left: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  iconWrap: {
    padding: 15,
    backgroundColor: "#E7EEFF",
    borderRadius: 999,
  },
  levelName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
    color: "#111C2D",
  },
  gameCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#464554",
  },
  percentage: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "right",
  },
  successLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#464554",
    textAlign: "right",
  },
});
