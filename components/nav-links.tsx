import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const links = [
  {
    label: "Statistics",
    icon: "stats-chart-outline" as const,
    href: "/(tabs)/stats" as const,
  },
  {
    label: "Settings",
    icon: "settings-outline" as const,
    href: "/(tabs)/settings" as const,
  },
];

export default function NavLinks() {
  return (
    <View style={styles.navLinks}>
      {links.map((link) => (
        <TouchableOpacity
          key={link.href}
          style={styles.navLink}
          onPress={() => router.push(link.href)}
        >
          <Ionicons name={link.icon} size={20} color="#4648D4" />
          <Text style={styles.navLinkText}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navLinks: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },
  navLinkText: {
    fontSize: 14,
    color: "#4648D4",
    fontWeight: "600",
  },
});
