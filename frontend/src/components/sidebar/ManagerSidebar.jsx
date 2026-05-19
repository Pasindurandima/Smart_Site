import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function ManagerSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "workflows", shortLabel: "WF", label: "Workflows" }, { key: "my-projects", shortLabel: "MP", label: "My Projects" }, { key: "project-board", shortLabel: "KB", label: "Project Board" }, { key: "tasks", shortLabel: "TS", label: "Tasks" }, { key: "milestones", shortLabel: "MS", label: "Milestones" }, { key: "schedule", shortLabel: "SC", label: "Schedule" }, { key: "progress", shortLabel: "PG", label: "Progress" }, { key: "reports", shortLabel: "RP", label: "Reports" }];
    return <BaseSidebar title="Project Manager" items={items} active={active} onSelect={onSelect} />;
}