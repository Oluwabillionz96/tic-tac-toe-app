import usePlayer from "@/hooks/use-player";
import { GameLevel, GameStatus } from "@/libs/types";
import { getLevel, getPlayerChoice } from "@/libs/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<{
  state: {
    isPlayerX: boolean | "random";
    gameStatus: GameStatus;
    gameLevel: GameLevel;
  };
  stateSetters: {
    setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>;
    setGameStatus: Dispatch<SetStateAction<GameStatus>>;
    setGameLevel: Dispatch<SetStateAction<GameLevel>>;
  };
} | null>(null);

const soundTrack = require("@/assets/sounds/soundtrack.wav");

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");
  const [gameLevel, setGameLevel] = useState<GameLevel>("medium");
  const player = usePlayer(soundTrack);

  useEffect(() => {
    getPlayerChoice(setIsPlayerX);
    getLevel(setGameLevel);
  }, []);

  useEffect(() => {
    player.loop = true;
    const audioHalfLength = player.duration / 2;
    player.play();

    if (gameStatus === "ended") {
      player.pause();
      player.seekTo(Math.random() * audioHalfLength);
    }

    return () => player.pause();
  }, [gameStatus, player]);

  return (
    <AppContext.Provider
      value={{
        state: { isPlayerX, gameStatus, gameLevel },
        stateSetters: { setIsPlayerX, setGameStatus, setGameLevel },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
