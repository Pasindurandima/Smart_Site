import React, { useMemo, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import Dashboard from '../pages/client/Dashboard';
import MyProject from '../pages/client/MyProject';
import ProjectTimeline from '../pages/client/ProjectTimeline';
import ProgressGallery from '../pages/client/ProgressGallery';
import Invoices from '../pages/client/Invoices';
import Payments from '../pages/client/Payments';
import Approvals from '../pages/client/Approvals';
import Profile from '../pages/client/Profile';

const pageMap = {
    dashboard: Dashboard,
    'my-project': MyProject,
    timeline: ProjectTimeline,
    gallery: ProgressGallery,
    invoices: Invoices,
    payments: Payments,
    approvals: Approvals,
    profile: Profile
};

export default function ClientRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <ClientLayout title="Client Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage />
        </ClientLayout>
    );
}