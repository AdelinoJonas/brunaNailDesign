import { Loading } from "components/Loading";
// import ToastAlert from "components/ToastAlert";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../pages/admin/components/Navigation/Navbar";
import { useStores } from "../../stores";
import * as Sc from "./styles";

export function AdminLayout() {
  const navigate = useNavigate()
  const { userStores: {
    localUser,
    fetchUser,
    token
  },
  // adminuserStores: {
  //   statusResponse,
  //   message,
  //   showToast,
  //   setShowToast
  // },
  // officeStore: {
  //   handlerGetOffice
  // } 
} = useStores();

  useEffect(() => {
    if (token) {
      fetchUser();
    }

    if (localUser?.is_admin === false) {
      navigate('/home');
    }
    // useEffect(() => {
      //   checkUserType();
      // }, [])
    }, [token])

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

  // let currentMessage = message;

  return (
    <Sc.LayoutContainer>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      {/* {
        showToast && (
          <ToastAlert
            status={statusResponse}
            message={currentMessage}
            showToast={showToast}
            setShowToast={setShowToast}
          />
        )
      } */}
    </Sc.LayoutContainer>

  )
}
