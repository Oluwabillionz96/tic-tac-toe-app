import React, { useEffect, useState } from "react";
import { getScores } from "@/libs/scores";
import { Scores, ScoresValues } from "@/libs/types";
import LifeRecord from "@/components/life-record";
import PerformanceCard from "@/components/performance-card";
import DetailedScores from "@/components/detailed-scores";
import PageWrapper from "@/components/page-wrapper";

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
    <PageWrapper>
      <LifeRecord totalScores={totalScores} />
      <PerformanceCard gameScores={gameScores} />
      <DetailedScores gameScores={gameScores} />
    </PageWrapper>
  );
};

export default StatsScreen;
