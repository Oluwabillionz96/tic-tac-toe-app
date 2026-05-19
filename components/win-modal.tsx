import { Modal, Text, View } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Button from "./button";
import { router } from "expo-router";
import useGameContext from "@/hooks/use-game-context";
import { getPlayerChoice } from "@/libs/utils";

const WinModal = () => {
  const {
    state: { winValues, board, isPlayerX },
    draw,
    stateSetter: { setBoard, setIsgameOn, setWinValues, setIsPlayerX },
  } = useGameContext();

  function reset() {
    setBoard(Array(9).fill(null));
    setIsgameOn(false);
    getPlayerChoice(setIsPlayerX);
    setWinValues(undefined);
  }

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";
  const playerWins = winner === playerValue;

  return (
    <Modal
      visible={(winValues && winValues?.length > 0) || draw}
      animationType="fade"
      transparent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 15,
            padding: 28,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0,
            shadowRadius: 4,
            elevation: 5,
            gap: 32,
          }}
        >
          <View
            style={{
              padding: 26,
              backgroundColor: "#FFDCC5",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {winValues ? (
              playerWins ? (
                <FontAwesome5 name="trophy" size={36} color="#904900" />
              ) : (
                <MaterialCommunityIcons
                  name="robot-angry"
                  size={36}
                  color="red"
                />
              )
            ) : (
              draw && (
                <FontAwesome name="balance-scale" size={36} color="#111C2D" />
              )
            )}
          </View>
          <Text
            style={{
              color: "#111C2D",
              textAlign: "center",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {winValues
              ? ` ${playerWins ? "You" : "Computer"} Win${playerWins ? "" : "s"}`
              : draw
                ? " Draw"
                : ""}
            !
          </Text>
          <Button handlePress={reset} label="Play Again" />
          <Button
            handlePress={() => {
              reset();
              router.push("/");
            }}
            label="Home"
            variant="invert"
          />
        </View>
      </View>
    </Modal>
  );
};

export default WinModal;
