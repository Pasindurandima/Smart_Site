import React, { useMemo, useState } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import Dashboard from '../pages/superadmin/Dashboard';
import Companies from '../pages/superadmin/Companies';
import Subscriptions from '../pages/superadmin/Subscriptions';
import Users from '../pages/superadmin/Users';
import Revenue from '../pages/superadmin/Revenue';
import Analytics from '../pages/superadmin/Analytics';
import Settings from '../pages/superadmin/Settings';

const pageMap = {
    dashboard: Dashboard,
    companies: Companies,
    subscriptions: Subscriptions,
    users: Users,
    revenue: Revenue,
    analytics: Analytics,
    settings: Settings
};

export default function SuperAdminRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <SuperAdminLayout title="Super Admin Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage />
        </SuperAdminLayout>
    );
}