import { View, Text } from "react-native";

const ScoreCard = ({
  label,
  score,
  textColor,
}: {
  label: string;
  score: number;
  textColor: string;
}) => {
  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 16,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 10,
          color: textColor,
        }}
      >
        {label}
      </Text>
      <Text style={{ color: "#111C2D", fontSize: 24, fontWeight: "semibold" }}>
        {score}
      </Text>
    </View>
  );
};

export default ScoreCard;
