import { useState, useContext } from "react";
import { socketSubscription } from "./api/socket.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SidebarDetailContext } from "./context/sidebar.jsx";
import { AuthContext } from "./context/auth.jsx";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import ChannelModal from "./components/ChannelModal";
import MessageBox from "./components/MessageBox";
import Messages from "./components/Messages";
import Welcome from "./components/Welcome/index.jsx";
import Login from "./Login/index.jsx";
import Signup from "./components/Signup/index.jsx";
import { MdClose } from "react-icons/md";

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [drawerShow, setDrawerShow] = useState(false);

  const { sidebarDetails } = useContext(SidebarDetailContext);
  const { auth } = useContext(AuthContext);

  socketSubscription();

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  if (!auth) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <>
      {modalShow && <ChannelModal toggleModal={toggleModal} />}
      <div className="md:grid md:grid-cols-10 w-full h-screen overflow-hidden flex">
        <section
          className={`
          ${!drawerShow && "hidden"}
          w-[80%] h-full absolute z-50 
          md:flex md:flex-col md:col-span-2 md:w-auto
          md:static
          `}
        >
          <Sidebar
            toggleModal={toggleModal}
            detailsShow={detailsShow}
            setDetailsShow={setDetailsShow}
            setDrawerShow={setDrawerShow}
          />
        </section>
        <div
          className={`
          ${!drawerShow && "hidden"}
          w-[20%] absolute right-0 top-2 h-full z-50
          `}
          onClick={() => setDrawerShow(false)}
        >
          <div
            role="button"
            className="bg-sidebar-footer w-10 h-10 m-auto flex items-center justify-center rounded-xl z-[60]"
          >
            <MdClose className="text-3xl text-white" />
          </div>
        </div>
        <div
          id="overlay"
          className={`z-[10] fixed top-0 bottom-0 w-full h-full  ${
            !drawerShow && "hidden"
          }`}
          onClick={() => setDrawerShow(false)}
        />
        <section className="w-full md:col-span-8 bg-content-primary flex flex-col justify-between overflow-y-scroll">
          <Nav toggleDrawerShow={() => setDrawerShow(!drawerShow)} />
          {sidebarDetails ? <Messages /> : <Welcome />}
          <div className="w-full p-5">{sidebarDetails && <MessageBox />}</div>
        </section>
      </div>
    </>
  );
};

export default App;
