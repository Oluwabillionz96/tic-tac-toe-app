import Board from "@/components/board";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        paddingInline: "5%",
      }}
    >
      <Board />
    </View>
  );
}
