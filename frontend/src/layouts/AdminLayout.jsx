import React from 'react';
import BaseLayout from './BaseLayout';
import AdminSidebar from '../components/sidebar/AdminSidebar.jsx';

export default function AdminLayout({ title, user, onLogout, active, onSelect, children }) {
    return (
        <BaseLayout
            title={title}
            user={user}
            onLogout={onLogout}
            SidebarComponent={AdminSidebar}
            active={active}
            onSelect={onSelect}
        >
            {children}
        </BaseLayout>
    );
}