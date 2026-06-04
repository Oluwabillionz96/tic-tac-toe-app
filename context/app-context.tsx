import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

const AppContext = createContext<{
  state: { isPlayerX: boolean | "random" };
  stateSetters: { setIsPlayerX: Dispatch<SetStateAction<boolean | "random">> };
} | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayerX, setIsPlayerX] = useState<boolean | "random">("random");
  return (
    <AppContext.Provider
      value={{ state: { isPlayerX }, stateSetters: { setIsPlayerX } }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
