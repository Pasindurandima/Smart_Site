import React from 'react';
import BaseLayout from './BaseLayout';
import ManagerSidebar from '../components/sidebar/ManagerSidebar.jsx';

export default function ManagerLayout({ title, user, onLogout, active, onSelect, children }) {
    return (
        <BaseLayout
            title={title}
            user={user}
            onLogout={onLogout}
            SidebarComponent={ManagerSidebar}
            active={active}
            onSelect={onSelect}
        >
            {children}
        </BaseLayout>
    );
}