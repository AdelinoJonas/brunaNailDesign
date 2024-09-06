import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Define os tipos para os props
interface ProtectedRoutesProps {
  redirectTo: string;
  allowedRoles?: string[]; // Roles que têm permissão para acessar
}

// Simulação de função para verificar o tipo de usuário
const getUserRole = () => {
  // Esta função deve retornar o papel do usuário com base na autenticação real
  return 'user'; // Pode ser 'user' ou 'admin'
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ redirectTo, allowedRoles = [] }) => {
  const userRole = getUserRole();
  const isAuthenticated = true; // Substitua com a lógica real de autenticação

  // Verifica se o usuário está autenticado e se o seu papel é permitido
  const hasAccess = isAuthenticated && (allowedRoles.length === 0 || allowedRoles.includes(userRole));

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoutes;
