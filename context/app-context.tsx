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

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");
  const [gameLevel, setGameLevel] = useState<GameLevel>("medium");

  useEffect(() => {
    getPlayerChoice(setIsPlayerX);
    getLevel(setGameLevel);
  }, []);
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
