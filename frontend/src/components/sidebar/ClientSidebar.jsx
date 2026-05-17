import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function ClientSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "my-project", shortLabel: "MP", label: "My Project" }, { key: "timeline", shortLabel: "TL", label: "Project Timeline" }, { key: "gallery", shortLabel: "GL", label: "Progress Gallery" }, { key: "invoices", shortLabel: "IV", label: "Invoices" }, { key: "payments", shortLabel: "PM", label: "Payments" }, { key: "approvals", shortLabel: "AP", label: "Approvals" }, { key: "profile", shortLabel: "PF", label: "Profile" }];
    return <BaseSidebar title="Client Portal" items={items} active={active} onSelect={onSelect} />;
}