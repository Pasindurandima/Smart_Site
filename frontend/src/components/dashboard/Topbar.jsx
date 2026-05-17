import React from 'react';

export default function Topbar({ user, onLogout, onToggleSidebar }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="mobile-menu-btn" onClick={onToggleSidebar}>
                    Menu
                </button>
                <div className="brand-mark">SmartSite ERP</div>
            </div>

            <div className="topbar-center">
                <input className="search-input" placeholder="Search projects, workers, invoices..." />
            </div>

            <div className="topbar-right">
                <button className="icon-btn">Alerts</button>
                <div className="profile-badge">
                    <div className="profile-name">{user?.name}</div>
                    <div className="profile-role">{user?.role}</div>
                </div>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
}