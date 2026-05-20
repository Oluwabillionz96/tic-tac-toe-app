import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const PlayScreenHeader = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(70, 72, 212, 0.05)",
        paddingVertical: 18,
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Link href="/" style={{ color: "#4648D4", fontSize: 16 }}>
            <AntDesign name="appstore" size={24} color="#4648D4" />
          </Link>
        </View>

        {/* Center */}
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "semibold",
              color: "#4648D4",
            }}
          >
            Tic-Tac-Toe
          </Text>
        </View>

        {/* Right */}
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Ionicons name={"stats-chart-outline"} size={24} color="#4648D4" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlayScreenHeader;
