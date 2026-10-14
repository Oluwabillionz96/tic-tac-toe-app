import { Platform } from "react-native";
import { createAudioPlayer, preload } from "expo-audio";
import type { AudioPlayer } from "expo-audio";

const SOURCES = {
  tap: require("@/assets/sounds/tap.wav"),
  win: require("@/assets/sounds/win.wav"),
  lose: require("@/assets/sounds/lose.wav"),
  notification: require("@/assets/sounds/notification.wav"),
  draw: require("@/assets/sounds/draw.wav"),
  soundtrack: require("@/assets/sounds/soundtrack.wav"),
} as const;

type SoundName = keyof typeof SOURCES;

// expo-audio's web implementation relies on the browser `Audio` global, which
// does not exist during static rendering (SSR) — skip setup there.
const canUseAudio = Platform.OS !== "web" || typeof window !== "undefined";

const players: Partial<Record<SoundName, AudioPlayer>> = {};

if (canUseAudio) {
  (Object.keys(SOURCES) as SoundName[]).forEach((name) => {
    preload(SOURCES[name]);
    players[name] = createAudioPlayer(SOURCES[name]);
  });
}

async function replay(name: SoundName) {
  const player = players[name];
  if (!player) return;
  await player.seekTo(0);
  player.play();
}

function halt(name: SoundName) {
  const player = players[name];
  if (!player) return;
  player.pause();
  player.seekTo(0);
}

export const playTap = () => replay("tap");
export const playWin = () => replay("win");
export const playLose = () => replay("lose");
export const playNotification = () => replay("notification");
export const playDraw = () => replay("draw");

export const stopTap = () => halt("tap");
export const stopWin = () => halt("win");
export const stopLose = () => halt("lose");
export const stopNotification = () => halt("notification");
export const stopDraw = () => halt("draw");

export function releaseAll() {
  (Object.keys(players) as SoundName[]).forEach((name) =>
    players[name]?.remove(),
  );
}
