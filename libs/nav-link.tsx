import React from "react";
import { Link, RelativePathString } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBlock: 24,
          paddingInline: 32,
          // backgroundColor: "red",
          borderRadius: 16,
          boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
        }}
      >
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Ionicons name={iconName} size={28} color={"#4648D4"} />
          <Text
            style={{ color: "#111C2D", fontWeight: "semibold", fontSize: 24 }}
          >
            {label}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#464554" />
      </View>
    </Link>
  );
};

export default NavLink;
