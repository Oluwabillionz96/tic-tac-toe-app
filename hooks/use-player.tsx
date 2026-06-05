import { useAudioPlayer } from "expo-audio";

const usePlayer = (audioSource: number) => {
  const player = useAudioPlayer(audioSource);
  return player;
};

export default usePlayer;
