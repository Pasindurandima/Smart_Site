import React from 'react';
import Login from '../pages/auth/Login';
import SuperAdminRoutes from './SuperAdminRoutes';
import AdminRoutes from './AdminRoutes';
import ManagerRoutes from './ManagerRoutes';
import EngineerRoutes from './EngineerRoutes';
import AccountantRoutes from './AccountantRoutes';
import ClientRoutes from './ClientRoutes';
import Unauthorized from '../pages/common/Unauthorized';
import MarketingSite from '../pages/public/MarketingSite';

export default function AppRoutes({ user, onLoginSuccess, onLogout }) {
    if (!user) {
        return <MarketingSite onLoginClick={() => document.getElementById('login-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} onLoginSuccess={onLoginSuccess} />;
    }

    const role = user?.role;

    if (role === 'SUPER_ADMIN') return <SuperAdminRoutes user={user} onLogout={onLogout} />;
    if (role === 'COMPANY_ADMIN') return <AdminRoutes user={user} onLogout={onLogout} />;
    if (role === 'PROJECT_MANAGER') return <ManagerRoutes user={user} onLogout={onLogout} />;
    if (role === 'SITE_ENGINEER') return <EngineerRoutes user={user} onLogout={onLogout} />;
    if (role === 'ACCOUNTANT') return <AccountantRoutes user={user} onLogout={onLogout} />;
    if (role === 'CLIENT') return <ClientRoutes user={user} onLogout={onLogout} />;

    return <Unauthorized />;
}