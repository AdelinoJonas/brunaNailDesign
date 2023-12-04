import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';

import { Login } from '../pages/Login';
import Home from '../pages/Home';
// import AdminLayout from '../layouts/AdminLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import Page404 from '../pages/Page404';

// import Dashboard from '../pages/admin/pages/Dashboard';
// import ActiveUsers from '../pages/admin/pages/ActiveUsers';
// import InactiveUsers from '../pages/admin/pages/InactiveUsers';
// import NewUser from '../pages/admin/pages/NewUser';
// import EditUser from '../pages/admin/pages/EditUser';
// import ViewUser from '../pages/admin/pages/ViewUser';
// import Home from '../pages/Home';
// import Clients from '../pages/Clients';
// import ClientArea from '../pages/ClientArea';
// import NewClient from '../pages/ClientArea/pages/NewClient';
// import ViewClient from '../pages/ClientArea/pages/ViewClient';
// import EditClient from '../pages/ClientArea/pages/EditClient';

function ProtectedRoutes() {
  return <Outlet />;
}

// function ProtectedRoutes({ redirectTo }) {
//   // const { userStores: { token } } = useStores();
//   // return token ? <Outlet /> : <Navigate to={redirectTo} />;
// }

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
      <Route element={<ProtectedRoutes redirectTo="/" />} >
        <Route path="/" element={<DefaultLayout />} >
          <Route path="/home" element={<Home />}/>
          {/* <Route path="/schedules" element={<Schedules />}>
            <Route path="/schedules/newSchedule" element={<NewSchedule />} /> */}
          {/* </Route> */}
          {/* <Route path="/schedules/:id" element={<MobileViewSchedule />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/new-client" element={<NewClient />} />
          <Route path="/clients/:id" element={<ClientArea />} />
          <Route path="/clients/:id/view-client" element={<ViewClient />} />
          <Route path="/clients/:id/edit-client" element={<EditClient />} />
          <Route path="/clients/:id/documents" element={<ViewDocuments />} />
          <Route path="/clients/:id/audiences" element={<ClientAudiences />} /> */}
        </Route>
        {/* <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/active-users" element={<ActiveUsers />} />
          <Route path="/dashboard/inactive-users" element={<InactiveUsers />} />
          <Route path="/dashboard/new-user" element={<NewUser />} />
          <Route path="/dashboard/edit-user/:id" element={<EditUser />} />
          <Route path="/dashboard/view-user/:id" element={<ViewUser />} />
        </Route> */}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

// Removed unused components:
// - Schedules
// - MobileViewSchedule
// - ViewDocuments
// - ClientAudiences

