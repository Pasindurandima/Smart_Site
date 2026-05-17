import React from 'react';

export default function Milestones() {
    const milestones = ['Foundation', 'Structure', 'Plumbing', 'Electrical', 'Finishing'];

    return (
        <div className="grid gap-4 md:grid-cols-5">
            {milestones.map((milestone) => (
                <article key={milestone} className="portal-card p-5 text-center">
                    <h2 className="portal-section-title">{milestone}</h2>
                    <p className="portal-muted mt-2">Phase tracking</p>
                </article>
            ))}
        </div>
    );
}