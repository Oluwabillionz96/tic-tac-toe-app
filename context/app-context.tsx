import { GameStatus } from "@/libs/types";
import { getPlayerChoice } from "@/libs/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<{
  state: { isPlayerX: boolean | "random"; gameStatus: GameStatus };
  stateSetters: {
    setIsPlayerX: Dispatch<SetStateAction<boolean | "random">>;
    setGameStatus: Dispatch<SetStateAction<GameStatus>>;
  };
} | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");

  useEffect(() => {
    getPlayerChoice(setIsPlayerX);
  }, []);
  return (
    <AppContext.Provider
      value={{
        state: { isPlayerX, gameStatus },
        stateSetters: { setIsPlayerX, setGameStatus },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
