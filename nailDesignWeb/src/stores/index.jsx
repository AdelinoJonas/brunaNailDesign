import { createContext, useContext, useEffect } from 'react';
// import { useAdminUser } from './admin_stores/adminuserStores';
// import { useAudience } from './audienceStore';
// import { useClient } from './clientStore';
// import { useForgotPassword } from './forgotStore';
import { useLoading } from './loadingStore';
// import { useModal } from './modal';
// import { useOffice } from './officeStore';
import { useContextUser } from './userStores';

const storesCtx = createContext(null);

export function useStores() {
  return useContext(storesCtx);
}

export function StoresProvider({ children }) {

  const userStores = useContextUser();
  // const modal = useModal();
  // const officeStore = useOffice();
  // const clientStore = useClient();
  // const audienceStore = useAudience();
  const loadingStore = useLoading();
  // const forgotStore = useForgotPassword();
  // const adminuserStores = useAdminUser();

  const { fetchUser } = userStores;

  useEffect(() => {
    fetchUser();
  }, [])

  return (

    <storesCtx.Provider value={
      {
        userStores,
        // modal,
        // clientStore,
        // audienceStore,
        // officeStore,
        loadingStore,
        // forgotStore,
        // adminuserStores
      }
    }>
      {children}
    </storesCtx.Provider>
  );
}
