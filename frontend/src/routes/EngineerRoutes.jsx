import React, { useMemo, useState } from 'react';
import EngineerLayout from '../layouts/EngineerLayout';
import Dashboard from '../pages/engineer/Dashboard';
import WorkflowCenter from '../pages/workflows/WorkflowCenter';
import AssignedSite from '../pages/engineer/AssignedSite';
import DailyUpdates from '../pages/engineer/DailyUpdates';
import UploadProgress from '../pages/engineer/UploadProgress';
import TaskList from '../pages/engineer/TaskList';
import TaskDetails from '../pages/engineer/TaskDetails';
import MaterialRequest from '../pages/engineer/MaterialRequest';
import SitePhotos from '../pages/engineer/SitePhotos';
import AttendanceView from '../pages/engineer/AttendanceView';

const pageMap = {
    dashboard: Dashboard,
    workflows: WorkflowCenter,
    'assigned-site': AssignedSite,
    'daily-updates': DailyUpdates,
    'upload-progress': UploadProgress,
    'task-list': TaskList,
    'task-details': TaskDetails,
    'material-request': MaterialRequest,
    'site-photos': SitePhotos,
    attendance: AttendanceView
};

export default function EngineerRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <EngineerLayout title="Site Engineer Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage user={user} onNavigate={setActive} />
        </EngineerLayout>
    );
}