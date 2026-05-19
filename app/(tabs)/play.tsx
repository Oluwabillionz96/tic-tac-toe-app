import PlayScreen from "@/components/play-screen";
import { GameProvider } from "@/context/game-context";

export default function Index() {
  return (
    <GameProvider>
      <PlayScreen />
    </GameProvider>
  );
}
