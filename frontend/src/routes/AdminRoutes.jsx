import React, { useMemo, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Projects from '../pages/admin/Projects';
import Workers from '../pages/admin/Workers';
import Inventory from '../pages/admin/Inventory';
import Finance from '../pages/admin/Finance';
import Invoices from '../pages/admin/Invoices';
import Clients from '../pages/admin/Clients';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

const pageMap = {
    dashboard: Dashboard,
    projects: Projects,
    workers: Workers,
    inventory: Inventory,
    finance: Finance,
    invoices: Invoices,
    clients: Clients,
    reports: Reports,
    settings: Settings
};

export default function AdminRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <AdminLayout title="Company Admin Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage />
        </AdminLayout>
    );
}