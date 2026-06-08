import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const usePlayer = (audioSource: number) => {
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  if (!status.isLoaded) return null;
  return player;
};

export default usePlayer;
