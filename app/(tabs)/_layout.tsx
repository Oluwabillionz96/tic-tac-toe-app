import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="./index.tsx" options={{ title: "Play" }} />
      <Tabs.Screen name="./settings.tsx" options={{ title: "Settings" }} />
    </Tabs>
  );
};

export default TabLayout;
