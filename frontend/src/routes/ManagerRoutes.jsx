import React, { useMemo, useState } from 'react';
import ManagerLayout from '../layouts/ManagerLayout';
import Dashboard from '../pages/manager/Dashboard';
import MyProjects from '../pages/manager/MyProjects';
import ProjectBoard from '../pages/manager/ProjectBoard';
import Tasks from '../pages/manager/Tasks';
import Milestones from '../pages/manager/Milestones';
import Schedule from '../pages/manager/Schedule';
import Progress from '../pages/manager/Progress';
import Reports from '../pages/manager/Reports';

const pageMap = {
    dashboard: Dashboard,
    'my-projects': MyProjects,
    'project-board': ProjectBoard,
    tasks: Tasks,
    milestones: Milestones,
    schedule: Schedule,
    progress: Progress,
    reports: Reports
};

export default function ManagerRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <ManagerLayout title="Project Manager Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage />
        </ManagerLayout>
    );
}