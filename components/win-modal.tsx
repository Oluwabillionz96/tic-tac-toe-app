import { Modal, Text, View } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Button from "./button";
import { router } from "expo-router";
import useGameContext from "@/hooks/use-game-context";
import { useEffect, useState } from "react";
import usePlayer from "@/hooks/use-player";

const WinModal = ({ reset }: { reset: () => void }) => {
  const {
    state: { winValues, board, isPlayerX, gameStatus },
    stateSetter: { setGameStatus },
    draw,
  } = useGameContext();

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";
  const playerWins = winner === playerValue;
  const [showModal, setShowModal] = useState(false);

  const getSound = () => {
    let soundpath;
    if (playerWins) {
      soundpath = require("@/assets/sounds/win.wav");
    } else if (draw) {
      soundpath = require("@/assets/sounds/draw.wav");
    } else {
      soundpath = require("@/assets/sounds/lose.wav");
    }
    return soundpath;
  };

  const player = usePlayer(getSound());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if ((winValues && winValues?.length > 0) || draw) {
      player.play();
      timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [draw, winValues, player]);

  return (
    <Modal
      visible={gameStatus === "ended" && showModal}
      animationType="slide"
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
            gap: 18,
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
          <Button
            handlePress={() => {
              reset();
              if (player.playing) {
                player.remove();
              }
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
              Play Again
            </Text>
          </Button>
          <Button
            handlePress={() => {
              reset();
              setGameStatus("none");
              router.push("/");
            }}
            variant="invert"
          >
            <Text
              style={{ fontSize: 24, textAlign: "center", color: "#4648D4" }}
            >
              Home
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default WinModal;
