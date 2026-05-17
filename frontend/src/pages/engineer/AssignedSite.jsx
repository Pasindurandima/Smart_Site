import React from 'react';

export default function AssignedSite() {
    const blocks = ['Site details', 'Location map', 'Supervisor info'];

    return (
        <div className="grid gap-4 xl:grid-cols-3">
            {blocks.map((block) => (
                <article key={block} className="portal-card p-5">
                    <h2 className="portal-section-title">{block}</h2>
                    <p className="portal-muted mt-2">Site assignment module content.</p>
                </article>
            ))}
        </div>
    );
}