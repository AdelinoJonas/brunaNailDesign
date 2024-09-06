import { Route, Routes } from 'react-router-dom';
import { Login } from '../Pages/Signup/Login';
import { DefaultLayout } from '../layouts/DefaultLayout';
import Page404 from '../Pages/Page404/';
import ProtectedRoutes from './ProtectedRoutes';
import CreateUser from '../Pages/Signup/CreateUser';

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<CreateUser/>} />
      <Route element={<ProtectedRoutes redirectTo="/" allowedRoles={['user', 'admin']} />} >
        <Route path="/" element={<DefaultLayout />} >
          {/* Rotas acessíveis por 'user' e 'admin' */}
          {/* <Route path="/home" element={<Home/>} /> */}
          {/* <Route path="/schedules" element={<Schedule />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/services" element={<ServiceList />} /> */}
        </Route>
      </Route>
      <Route element={<ProtectedRoutes redirectTo="/" allowedRoles={['admin']} />} >
        {/* Rotas acessíveis apenas por 'admin' */}
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        {/* Adicione outras rotas específicas para administradores aqui */}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
