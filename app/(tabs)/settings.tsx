import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { reset } from "@/libs/utils";
import PageWrapper from "@/components/page-wrapper";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const SettingsScreen = () => {
  useEffect(() => {
    reset();
  }, []);
  return (
    <PageWrapper>
      <View style={{ gap: 16 }}>
        <Text
          style={{ color: "#767586", fontWeight: "semibold", fontSize: 12 }}
        >
          Game Preferences
        </Text>
        <View
          style={{
            backgroundColor: "#F0F3FF",
            borderRadius: 12,
            padding: 8,
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: 8,
              paddingInline: 16,
              paddingVertical: 28,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Feather name="user" size={16} color="#4648D4" />
              <Text style={{ color: "#111C2D", fontSize: 16 }}>
                Player Symbol
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#E7EEFF",
                borderRadius: 999,
                padding: 4,
                gap: 4,
              }}
            >
              {["X", "O", "Random"].map((symbol) => {
                const iconSize = 20;
                const isSelected = "X";
                const iconColor = symbol === isSelected ? "white" : "#C7C4D7";
                return (
                  <Text
                    key={symbol}
                    style={{
                      fontSize: 20,
                      padding: 5,
                      backgroundColor:
                        symbol === isSelected ? "#4648D4" : "transparent",
                      borderRadius: "100%",
                    }}
                  >
                    {symbol === "X" ? (
                      <MaterialCommunityIcons
                        name="window-close"
                        size={iconSize}
                        color={iconColor}
                      />
                    ) : symbol === "O" ? (
                      <FontAwesome6
                        name={"circle"}
                        size={iconSize}
                        color={iconColor}
                      />
                    ) : (
                      <FontAwesome
                        name={"random"}
                        size={iconSize}
                        color={iconColor}
                      />
                    )}
                  </Text>
                );
              })}
            </View>
          </View>
          <View
            style={{
              // flexDirection: "row",
              // justifyContent: "space-between",
              backgroundColor: "white",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <View style={{ flexDirection: "row", gap: 12 }}>
              <FontAwesome6 name="chart-simple" size={16} color="##4648D4" />
              <Text style={{ color: "#111C2D", fontSize: 16 }}>Difficulty</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              {["easy", "meduim", "hard"].map((level) => (
                <TouchableOpacity key={level}>
                  <Text>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};

export default SettingsScreen;
