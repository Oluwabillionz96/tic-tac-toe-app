import { Modal, Text, View } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Button from "./button";
import { router } from "expo-router";
import useGameContext from "@/hooks/use-game-context";
import { useEffect } from "react";

const WinModal = ({ reset }: { reset: () => void }) => {
  const {
    state: { winValues, board, isPlayerX, gameStatus },
    stateSetter: { setGameStatus },
    draw,
  } = useGameContext();

  const winner = winValues && board[winValues[0]];
  const playerValue = isPlayerX ? "X" : "O";
  const playerWins = winner === playerValue;
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if ((winValues && winValues?.length > 0) || draw) {
      timer = setTimeout(() => {
        // setShowModal(true);
        setGameStatus("ended");
      }, 1500);
    }

    return () => clearTimeout(timer);
  });

  return (
    <Modal visible={gameStatus === "ended"} animationType="slide" transparent>
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
              // setShowModal(false);
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
