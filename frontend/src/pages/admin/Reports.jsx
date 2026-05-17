import React from 'react';

export default function Reports() {
    const blocks = ['Profit Report', 'Project Performance', 'Attendance Summary'];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {blocks.map((block) => (
                <article key={block} className="portal-card p-5">
                    <h2 className="portal-section-title">{block}</h2>
                    <p className="portal-muted mt-2">Exportable report block for {block.toLowerCase()}.</p>
                </article>
            ))}
        </div>
    );
}