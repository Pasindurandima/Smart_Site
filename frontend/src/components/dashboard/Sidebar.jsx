import React from 'react';

export default function Sidebar({
    items,
    activeKey,
    onSelect,
    collapsed,
    onToggleCollapse,
    mobileOpen,
    onCloseMobile
}) {
    return (
        <>
            {mobileOpen && <div className="sidebar-overlay" onClick={onCloseMobile} />}
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span>{collapsed ? 'Menu' : 'Role Menu'}</span>
                    <button onClick={onToggleCollapse} className="collapse-btn">
                        {collapsed ? 'Expand' : 'Collapse'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {items.map((item) => (
                        <button
                            key={item.key}
                            className={`sidebar-item ${activeKey === item.key ? 'active' : ''}`}
                            onClick={() => {
                                onSelect(item.key);
                                onCloseMobile();
                            }}
                            title={item.label}
                        >
                            <span className="sidebar-icon">{item.shortLabel}</span>
                            {!collapsed && <span className="sidebar-label">{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}