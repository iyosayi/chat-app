import { useContext, useState } from "react";

import { AuthContext } from "../../context/auth";
import { BiChevronDown } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

const SidebarFooter = () => {
  const { auth } = useContext(AuthContext);
  const [contextMenuShow, setContextMenuShow] = useState(false);

  return (
    <div
      role="button"
      className="flex p-5 items-center justify-between max-w-[280px]"
      onClick={() => {
        console.log("Clicked");
        setContextMenuShow(!contextMenuShow);
      }}
    >
      {contextMenuShow && <ContextMenu />}
      <div className="mr-3">
        <img
          src={auth.imageUrl}
          className="rounded-lg w-10 h-10 object-cover"
        />
      </div>
      <p className="lg:-ml-10 text-sm">{`${auth.firstName || ""} ${
        auth.lastName || ""
      }`}</p>
      <BiChevronDown />
    </div>
  );
};

const ContextMenu = () => {
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    setAuth(null);
  };

  return (
    <div className="absolute bottom-10 left-8 bg-sidebar-context-primary p-3 space-y-3 rounded-lg text-sm">
      <button className="flex items-center gap-2 rounded-lg hover:bg-sidebar-context-hover w-full p-2">
        <MdAccountCircle className="text-2xl" />
        My Profile
      </button>

      <hr className="opacity-20" />
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg hover:bg-sidebar-context-hover w-full p-2 text-red-500"
      >
        <RiLogoutBoxRLine className="text-2xl" />
        Logout
      </button>
    </div>
  );
};

export default SidebarFooter;
