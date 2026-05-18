import { View, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

const SymbolCard = ({
  icon,
  label,
  isSelected,
  handlePress,
}: {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ outline: "none" }}>
      <View
        style={{
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 21,
          backgroundColor: "#F0F3FF",
          gap: 7,
          alignItems: "center",
          ...(isSelected
            ? {
                borderColor: "#6063EE",
                borderWidth: 2,
                borderStyle: "solid",
              }
            : {}),
        }}
      >
        {icon}
        <Text
          style={{
            color: "#767586",
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SymbolCard;
