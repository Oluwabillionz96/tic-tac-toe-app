import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ModalHeaderProps {
  title: string;
}

export default function ModalHeader({ title }: ModalHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#111C2D",
    textAlign: "center",
    fontWeight: "600",
  },
});
