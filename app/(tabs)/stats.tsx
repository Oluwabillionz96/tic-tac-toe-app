import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getScores } from "@/libs/scores";
import { Scores, ScoresValues } from "@/libs/types";
import LifeRecord from "@/components/life-record";
import PerformanceCard from "@/components/performance-card";
import { getGameCounts } from "@/libs/games";

const StatsScreen = () => {
  const [gameScores, setGameScores] = useState<Scores | null>(null);
  const [totalScores, setTotalScores] = useState<ScoresValues>({
    player: 0,
    computer: 0,
    draw: 0,
  });

  useEffect(() => {
    getScores("return").then((data) => {
      if (data) {
        setGameScores(data.parsedScores);
        return;
      }
    });
    getScores("set", setTotalScores);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingInline: 24,
        paddingVertical: 16,
        backgroundColor: "#F9F9FF",
        gap: 16,
      }}
    >
      <LifeRecord totalScores={totalScores} />
      <PerformanceCard gameScores={gameScores} />
    </ScrollView>
  );
};

export default StatsScreen;
