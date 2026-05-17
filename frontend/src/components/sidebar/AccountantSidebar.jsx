import React from 'react';
import BaseSidebar from './BaseSidebar';

export default function AccountantSidebar({ active, onSelect }) {
    const items = [{ key: "dashboard", shortLabel: "DB", label: "Dashboard" }, { key: "expenses", shortLabel: "EX", label: "Expenses" }, { key: "invoices", shortLabel: "IV", label: "Invoices" }, { key: "payments", shortLabel: "PM", label: "Payments" }, { key: "profit-loss", shortLabel: "PL", label: "Profit/Loss" }, { key: "budget", shortLabel: "BD", label: "Budget" }, { key: "reports", shortLabel: "RP", label: "Reports" }];
    return <BaseSidebar title="Accountant" items={items} active={active} onSelect={onSelect} />;
}