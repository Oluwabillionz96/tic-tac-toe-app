import { AppContext } from "@/context/app-context";
import { useContext } from "react";

const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return appContext;
};

export default useAppContext;
