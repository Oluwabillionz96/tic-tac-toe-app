import { Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NavLinksContainer from "@/components/nav-links-container";

const HomeScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#F9F9FF",
        justifyContent: "center",
        alignItems: "center",
        paddingInline: 24,
      }}
    >
      <View style={{ width: "100%", gap: 40 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 30,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 32, color: "#4648D4" }}>
            Tic-Tac-Toe
          </Text>
          <View style={{ gap: 15 }}>
            <View
              style={{
                paddingBlock: 24,
                paddingInline: 32,
                boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
                borderRadius: 24,
                alignSelf: "center",
              }}
            >
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={50}
                color="#4648D4"
              />
            </View>
            <Text
              style={{
                textTransform: "uppercase",
                letterSpacing: 3,
                color: "#464554",
                fontWeight: "semibold",
                fontSize: 12,
              }}
            >
              Minimalistic Play
            </Text>
          </View>
        </View>
        <NavLinksContainer />
      </View>
    </View>
  );
};

export default HomeScreen;
