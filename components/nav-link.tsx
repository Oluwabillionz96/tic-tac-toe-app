import React from "react";
import { Link, RelativePathString } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

const NavLink = ({
  href,
  label,
  iconName,
}: {
  href: RelativePathString;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}) => {
  return (
    <Link href={href}>
      <View style={styles.container}>
        <View style={styles.labelAndIconWrapper}>
          <Ionicons name={iconName} size={28} color={"#4648D4"} />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#464554" />
      </View>
    </Link>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBlock: 24,
    paddingInline: 32,
    // backgroundColor: "red",
    borderRadius: 16,
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
  },
  labelAndIconWrapper: { flexDirection: "row", gap: 16, alignItems: "center" },
  label: { color: "#111C2D", fontWeight: "semibold", fontSize: 24 },
});
