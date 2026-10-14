import { AppProvider } from "@/context/app-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { setAudioModeAsync } from "expo-audio";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "mixWithOthers",
    }).catch(() => {});
  }, []);

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
      <Toast />
    </AppProvider>
  );
}
