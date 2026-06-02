import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getScores } from "@/libs/scores";
import { Scores, ScoresValues } from "@/libs/types";

const StatsScreen = () => {
  const [gameScores, setGameScores] = useState<Scores | null>(null);
  useEffect(() => {
    getScores("return").then((data) => {
      if (data) {
        setGameScores(data.parsedScores);
        return;
      }
    });
  }, []);

  return (
    <View>
      {gameScores && (
        <>
          {Object.keys(gameScores).map((level, levelIndex) => (
            <View key={levelIndex}>
              <Text>{level}</Text>
              <View>
                <Text>Scores</Text>
                <View>
                  {Object.keys(gameScores[level as keyof Scores]).map(
                    (scores, scoreIndex) => (
                      <Text key={scoreIndex}>
                        {scores} :{" "}
                        {
                          gameScores[level as keyof Scores][
                            scores as keyof ScoresValues
                          ]
                        }
                      </Text>
                    ),
                  )}
                </View>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default StatsScreen;
