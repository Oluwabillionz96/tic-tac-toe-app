import { createContext, ReactNode } from "react";
import useGame from "@/hooks/use-game";
import useAppContext from "@/hooks/use-app-context";

const GameContext = createContext<ReturnType<typeof useGame> | null>(null);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const {
    stateSetters: { setIsPlayerX, setGameStatus, setGameLevel },
    state: { isPlayerX, gameStatus, gameLevel, hasSoundEffect },
  } = useAppContext();
  const game = useGame(
    isPlayerX,
    setIsPlayerX,
    gameStatus,
    setGameStatus,
    gameLevel,
    setGameLevel,
    hasSoundEffect
  );
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
