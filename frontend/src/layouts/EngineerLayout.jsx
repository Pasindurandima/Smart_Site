import React from 'react';
import BaseLayout from './BaseLayout';
import EngineerSidebar from '../components/sidebar/EngineerSidebar.jsx';

export default function EngineerLayout({ title, user, onLogout, active, onSelect, children }) {
    return (
        <BaseLayout
            title={title}
            user={user}
            onLogout={onLogout}
            SidebarComponent={EngineerSidebar}
            active={active}
            onSelect={onSelect}
        >
            {children}
        </BaseLayout>
    );
}