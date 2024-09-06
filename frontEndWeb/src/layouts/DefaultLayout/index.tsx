// import { ConfirmModal } from "components/ConfirmModal";
// import { DeleteModal } from "components/DeleteModal";
// import { Navbar } from "components/Navbar";
// import { MobileNavbar } from "components/Navbar/MobileNavbar";
// import { SearchInput } from "components/SearchInput";
// import ModalLogout from "components/SideNavigation/ModalLogout";
// import { ModalEditClient } from "pages/ClientArea/components/ModalEditClient";
// import { ModalNewClient } from "pages/ClientArea/components/ModalNewClient";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStores } from '../../stores';
import './styles.css';
import SideMenu from "../../components/Navigation/SideMenu";
import { Header } from "../../components/Header";
import MobileMenu from "../../components/Navigation/MobileMenu";
// import ToastAlert from "components/ToastAlert";

export function DefaultLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let screenWidth = window.innerWidth;

  // const {
  //   // userStores: {
  //   //   fetchUser,
  //   //   token
  //   // },
  //   // audienceStore: {
  //   //   statusResponse,
  //   //   message,
  //   //   showToast,
  //   //   setShowToast
  //   // },
  // } = useStores();

  // let currentMessage = message;

  useEffect(() => {
    navigate('/home');
  }, []);

  // useEffect(() => {
  //   let timer;
  //   if (showToast) {
  //     timer = setTimeout(() => {
  //       setShowToast(true);
  //       if (statusResponse === 200 || statusResponse === 201) {
  //         setShowToast(false);
  //       } else {
  //         setShowToast(false);
  //       }
  //     }, 3000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [showToast]);

  return (
//     <Sc.LayoutContainer>
//       {/* <DeleteModal />
//       <ModalNewClient />
//       <ModalEditClient />
//       <ConfirmModal />
//       <ModalLogout /> */}
//      {/* {screenWidth > 1000 ? */}
//         {/* <Sc.HeaderPage /> :
//         <Sc.MobileContainer >
//         <MobileMenu />
//       </Sc.MobileContainer> */}
//       {/* } */}
//       <Sc.AsideNavibar>
//         <SideMenu />
//       </Sc.AsideNavibar>
//       <Sc.Main>
//         <Outlet />
//       </Sc.Main>
//     </Sc.LayoutContainer>
//   )
// }
  <>
    <div className="layout-container">
      {/* <DeleteModal />
      <ModalNewClient />
      <ModalEditClient />
      <ConfirmModal />
      <ModalLogout /> */}
      {screenWidth > 1080 ?
        <div className="header-page">
          <Header />
        </div>
        :
        <div className="mobileContainer" >
          <MobileMenu />
        </div>
      }
      <div className="aside-navibar">
        <SideMenu />
      </div>
      <div className="main">
        {/* {(pathname === '/home' || pathname === '/clients') &&
          <Sc.MobileContainer >
            <SearchInput />
          </Sc.MobileContainer>
        } */}
        <Outlet />
      </div>
    </div>
    </>
  )
}
