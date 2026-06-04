import PageHeader from "@/components/page-header";
import PlayScreenHeader from "@/components/play-screen-header";
import { AppProvider } from "@/context/app-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
const TabLayout = () => {
  return (
    <AppProvider>
      {" "}
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
            header: () => <PlayScreenHeader />,
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
            header: () => <PageHeader page="Statistics" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            header: () => <PageHeader page="Settings" />,
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
    </AppProvider>
  );
};

export default TabLayout;
