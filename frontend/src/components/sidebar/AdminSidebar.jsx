import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function AdminSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "projects", shortLabel: "PR", label: "Projects" }, { key: "workers", shortLabel: "WK", label: "Workers" }, { key: "inventory", shortLabel: "IN", label: "Inventory" }, { key: "finance", shortLabel: "FI", label: "Finance" }, { key: "invoices", shortLabel: "IV", label: "Invoices" }, { key: "clients", shortLabel: "CL", label: "Clients" }, { key: "reports", shortLabel: "RP", label: "Reports" }, { key: "settings", shortLabel: "SE", label: "Settings" }];
    return <BaseSidebar title="Company Admin" items={items} active={active} onSelect={onSelect} />;
}