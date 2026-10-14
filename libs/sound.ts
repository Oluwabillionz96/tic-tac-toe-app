// import { Audio } from "expo-av";

// async function getSound(file: number) {
//   const { sound } = await Audio.Sound.createAsync(file);
//   return sound;
// }

// export async function cutSound(sound: Audio.Sound) {
//   await sound.unloadAsync();
// }

// export async function playSound(file: number) {
//   const sound = await getSound(file);
//   await sound.playAsync();
//   sound.setOnPlaybackStatusUpdate((status) => {
//     if (status.isLoaded && status.didJustFinish) {
//       sound.unloadAsync();
//     }
//   });
//   return sound;
// }
