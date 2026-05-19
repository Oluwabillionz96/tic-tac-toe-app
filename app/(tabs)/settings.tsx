import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { reset } from "@/libs/utils";

const SettingsScreen = () => {
  useEffect(() => {
    reset();
  }, []);
  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
