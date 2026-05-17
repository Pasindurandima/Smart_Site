import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function SuperAdminSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "companies", shortLabel: "CO", label: "Companies" }, { key: "subscriptions", shortLabel: "SU", label: "Subscriptions" }, { key: "users", shortLabel: "US", label: "Users" }, { key: "revenue", shortLabel: "RE", label: "Revenue" }, { key: "analytics", shortLabel: "AN", label: "Analytics" }, { key: "settings", shortLabel: "SE", label: "Settings" }];
    return <BaseSidebar title="Super Admin" items={items} active={active} onSelect={onSelect} />;
}