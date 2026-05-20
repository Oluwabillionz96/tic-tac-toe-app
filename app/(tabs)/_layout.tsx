import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Tabs } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4648D4",
        headerStyle: {
          backgroundColor: "rgba(70, 72, 212, 0.05)",
        },
        headerShadowVisible: false,
        headerTintColor: "#4648D4",
        tabBarStyle: {
          backgroundColor: "white",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#C7C4D7",
        },
        tabBarInactiveTintColor: "rgba(70, 69, 84, 0.6)",
      }}
    >
      <Tabs.Screen
        name="play"
        options={{
          header: () => (
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
                    <Ionicons
                      name={"stats-chart-outline"}
                      size={24}
                      color="#4648D4"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "gamepad-variant" : "gamepad-variant-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />{" "}
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "stats-chart-sharp" : "stats-chart-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
