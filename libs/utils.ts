import { Dispatch, SetStateAction } from "react";
import { Board, GameLevel } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RelativePathString } from "expo-router";
import Toast from "react-native-toast-message";

export const wins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function toast(message: string) {
  Toast.show({
    type: "info",
    text1: message,
    swipeable: true,
    visibilityTime: 2000,
  });
}

export const updatePlayerChoice = (
  setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>,
  newValue?: boolean | "random",
  isActiveGame?: boolean,
) => {
  if (newValue !== undefined) {
    if (isActiveGame) {
      toast("Finish the ongoing game first to change symbol");
      return;
    }
    setIsPlayerX(newValue);
    saveLocalData("playerChoice", JSON.stringify(newValue));
    return;
  }

  setIsPlayerX((currentValue) => {
    if (currentValue === "random") {
      saveLocalData("playerChoice", JSON.stringify("random"));
      return Math.floor(Math.random() * 2) === 1;
    } else {
      saveLocalData("playerChoice", JSON.stringify(currentValue));
      return currentValue;
    }
  });
};

export const navigationLinks: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  href: RelativePathString;
}[] = [
  { label: "Play", iconName: "play-outline", href: "./(tabs)/play" },
  {
    label: "Statistics",
    iconName: "stats-chart-outline",
    href: "./(tabs)/stats",
  },
  {
    label: "Settings",
    iconName: "settings-outline",
    href: "./(tabs)/settings",
  },
];

export function getRandomIndex(multipliyer: number) {
  return Math.floor(Math.random() * multipliyer);
}

export function getRandomMove(board: Board) {
  const emptyIndices = board
    .map((item, index) => (item === null ? index : -1))
    .filter((index) => index !== -1);

  if (emptyIndices.length === 0) return -1;

  return emptyIndices[getRandomIndex(emptyIndices.length)];
}

export const checkWin = (board: ("X" | "O" | null)[]) => {
  for (const win of wins) {
    const [a, b, c] = win;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return win; // Return winning indices
    }
  }
  return undefined;
};

export async function saveLocalData(key: string, value: string) {
  if (typeof window === "undefined") return;
  const { default: AsyncStorage } =
    await import("@react-native-async-storage/async-storage");
  await AsyncStorage.setItem(key, value);
}

export async function getLocalData(key: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const { default: AsyncStorage } =
    await import("@react-native-async-storage/async-storage");
  return await AsyncStorage.getItem(key);
}

export async function reset() {
  if (typeof window === "undefined") return;
  const { default: AsyncStorage } =
    await import("@react-native-async-storage/async-storage");
  return await AsyncStorage.clear();
}

export async function getPlayerChoice(
  setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>,
) {
  const playerChoice = await getLocalData("playerChoice");
  if (playerChoice) {
    try {
      const parsed = JSON.parse(playerChoice);
      // Validate that parsed value is valid
      if (parsed === true || parsed === false || parsed === "random") {
        setIsPlayerX(parsed);
      }
    } catch (error) {
      console.error("Error parsing player choice from localStorage:", error);
    }
  }
}

export async function getLevel(setLevel: Dispatch<SetStateAction<GameLevel>>) {
  const level = await getLocalData("level");
  let parsedLevel: GameLevel = "medium";
  if (level) {
    try {
      const parsed = JSON.parse(level);
      if (parsed === "easy" || parsed === "medium" || parsed === "hard") {
        parsedLevel = parsed;
      }
    } catch (error) {
      console.error("Error parsing Level from localStorage:", error);
    }
  }

  setLevel(parsedLevel);
  return;
}
