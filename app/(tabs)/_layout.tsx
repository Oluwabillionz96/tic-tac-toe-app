import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="./index.tsx" options={{ title: "Tic-Tac-Toe" }} />
      <Tabs.Screen name="./settings.tsx" options={{ title: "Settings" }} />
      <Tabs.Screen name="./stats.txs" options={{ title: "Statistics" }} />
    </Tabs>
  );
};

export default TabLayout;
