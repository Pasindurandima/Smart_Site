import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function EngineerSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "workflows", shortLabel: "WF", label: "Workflows" }, { key: "assigned-site", shortLabel: "AS", label: "Assigned Site" }, { key: "daily-updates", shortLabel: "DU", label: "Daily Updates" }, { key: "upload-progress", shortLabel: "UP", label: "Upload Progress" }, { key: "task-list", shortLabel: "TL", label: "Task List" }, { key: "material-request", shortLabel: "MR", label: "Material Request" }, { key: "site-photos", shortLabel: "SP", label: "Site Photos" }, { key: "attendance", shortLabel: "AT", label: "Attendance" }];
    return <BaseSidebar title="Site Engineer" items={items} active={active} onSelect={onSelect} />;
}