import { ReactNode } from "react";
import { ScrollView } from "react-native";

const PageWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingInline: 24,
        paddingVertical: 16,
        backgroundColor: "#F9F9FF",
        gap: 16,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default PageWrapper;
