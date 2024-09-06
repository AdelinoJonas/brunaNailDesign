import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../../pages/admin/components/Navigation/Navbar';
import { useStores } from '../../stores';
import { Loading } from 'components/Loading';
import './styles.css';  // Import the CSS file instead of styled-components

export function AdminLayout() {
  const navigate = useNavigate();
  const {
    userStores: { localUser, fetchUser, token },
  } = useStores();

  useEffect(() => {
    if (token) {
      fetchUser();
    }

    if (localUser?.is_admin === false) {
      navigate('/home');
    }
  }, [token, localUser, fetchUser, navigate]);

  return (
    <div className="layout-container">
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
