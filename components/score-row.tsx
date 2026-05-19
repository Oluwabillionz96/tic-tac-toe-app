import { View } from "react-native";
import React from "react";
import ScoreCard from "./score-card";
import useGameContext from "@/hooks/use-game-context";

const ScoreRow = () => {
  const {
    state: { scores: scoresValue, isPlayerX },
  } = useGameContext();
  const scores = [
    {
      label: `You ( ${isPlayerX ? "X" : "O"} )`,
      score: scoresValue.player,
      textColor: "rgba(70, 72, 212, 0.7)",
    },
    {
      label: "Draws",
      score: scoresValue.draw,
      textColor: "rgba(118, 117, 134, 0.7)",
    },
    {
      label: `CPU ( ${!isPlayerX ? "X" : "O"} )`,
      score: scoresValue.computer,
      textColor: "rgba(185, 5, 56, 0.7)",
    },
  ];
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>
      {scores.map((item, index) => (
        <ScoreCard {...item} key={index} />
      ))}
    </View>
  );
};

export default ScoreRow;
