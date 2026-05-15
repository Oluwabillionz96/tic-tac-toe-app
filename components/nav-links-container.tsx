import { FlatList } from "react-native";
import { navigationLinks } from "../libs/utils";
import NavLink from "./nav-link";

const NavLinksContainer = () => {
  return (
    <FlatList
      contentContainerStyle={{ width: "100%", gap: 16, padding: 10 }}
      data={navigationLinks}
      renderItem={({ item }) => <NavLink {...item} />}
    />
  );
};

export default NavLinksContainer;
