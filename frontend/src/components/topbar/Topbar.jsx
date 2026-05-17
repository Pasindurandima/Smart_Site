import React from 'react';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';

export default function Topbar({ title, user, onLogout }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="brand-mark">SmartSite ERP</div>
            </div>
            <div className="topbar-center">
                <input className="search-input" placeholder="Search..." />
            </div>
            <div className="topbar-right">
                <Notification />
                <ProfileMenu user={user} onLogout={onLogout} />
            </div>
        </header>
    );
}