import React, { useMemo, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import WorkflowCenter from '../pages/workflows/WorkflowCenter';
import Projects from '../pages/admin/Projects';
import ProjectDetails from '../pages/admin/ProjectDetails';
import CreateProject from '../pages/admin/CreateProject';
import Workers from '../pages/admin/Workers';
import AddWorker from '../pages/admin/AddWorker';
import Inventory from '../pages/admin/Inventory';
import AddMaterial from '../pages/admin/AddMaterial';
import Finance from '../pages/admin/Finance';
import Expenses from '../pages/admin/Expenses';
import Invoices from '../pages/admin/Invoices';
import Clients from '../pages/admin/Clients';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';
import MaterialRequests from '../pages/admin/MaterialRequests';

const pageMap = {
    dashboard: Dashboard,
    workflows: WorkflowCenter,
    projects: Projects,
    'project-details': ProjectDetails,
    'create-project': CreateProject,
    workers: Workers,
    'add-worker': AddWorker,
    inventory: Inventory,
    'add-material': AddMaterial,
    'material-requests': MaterialRequests,
    finance: Finance,
    expenses: Expenses,
    invoices: Invoices,
    clients: Clients,
    reports: Reports,
    settings: Settings
};

export default function AdminRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <AdminLayout title="Company Admin Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage user={user} onNavigate={setActive} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
        </AdminLayout>
    );
}