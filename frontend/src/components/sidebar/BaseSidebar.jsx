import React from 'react';

export default function BaseSidebar({ title, items, active, onSelect }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span>{title}</span>
            </div>
            <nav className="sidebar-nav">
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={`sidebar-item ${active === item.key ? 'active' : ''}`}
                        onClick={() => onSelect(item.key)}
                    >
                        <span className="sidebar-icon">{item.shortLabel}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}