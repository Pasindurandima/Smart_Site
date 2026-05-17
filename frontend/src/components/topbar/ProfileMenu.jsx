import React from 'react';

export default function ProfileMenu({ user, onLogout }) {
    return (
        <div className="profile-badge">
            <div className="profile-name">{user?.name || 'User'}</div>
            <div className="profile-role">{user?.role || 'N/A'}</div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
    );
}