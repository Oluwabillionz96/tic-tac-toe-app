import { GameContext } from "@/context/game-context";
import { useContext } from "react";

const useGameContext = () => {
  const game = useContext(GameContext);

  if (!game) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return game;
};

export default useGameContext;
