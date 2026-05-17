import React from 'react';
import BaseLayout from './BaseLayout';
import SuperAdminSidebar from '../components/sidebar/SuperAdminSidebar.jsx';

export default function SuperAdminLayout({ title, user, onLogout, active, onSelect, children }) {
    return (
        <BaseLayout
            title={title}
            user={user}
            onLogout={onLogout}
            SidebarComponent={SuperAdminSidebar}
            active={active}
            onSelect={onSelect}
        >
            {children}
        </BaseLayout>
    );
}