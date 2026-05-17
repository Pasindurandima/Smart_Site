import React from 'react';

export default function Reports() {
    const items = ['Financial Reports', 'Budget Export', 'Profit/Loss Export'];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {items.map((item) => (<article key={item} className="portal-card p-5"><h2 className="portal-section-title">{item}</h2><p className="portal-muted mt-2">Export-ready finance report</p></article>))}
        </div>
    );
}