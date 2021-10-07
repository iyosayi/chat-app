import { useContext } from "react";

import { MdDehaze } from "react-icons/md";
import { SidebarDetailContext } from "../../context/sidebar";

const Nav = ({ toggleDrawerShow }) => {
  const { sidebarDetails } = useContext(SidebarDetailContext);

  return (
    <nav className="shadow-md text-white py-5 px-2 md:px-10 flex items-center">
      <MdDehaze
        className="text-2xl mr-4 md:hidden"
        role="button"
        onClick={toggleDrawerShow}
      />
      <div>{sidebarDetails ? sidebarDetails.name : "Chat Group"}</div>
    </nav>
  );
};

export default Nav;
