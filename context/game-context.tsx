import { createContext, ReactNode } from "react";
import useGame from "@/hooks/use-game";

const GameContext = createContext<ReturnType<typeof useGame> | null>(null);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const game = useGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
