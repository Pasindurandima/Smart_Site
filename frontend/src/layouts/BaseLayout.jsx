import React from 'react';
import Topbar from '../components/topbar/Topbar';

export default function BaseLayout({ title, user, onLogout, SidebarComponent, active, onSelect, children }) {
    return (
        <div className="erp-shell">
            <Topbar title={title} user={user} onLogout={onLogout} />
            <div className="erp-body">
                <SidebarComponent active={active} onSelect={onSelect} />
                <main className="erp-main">
                    <section className="module-heading">
                        <h2>{title}</h2>
                    </section>
                    {children}
                </main>
            </div>
        </div>
    );
}