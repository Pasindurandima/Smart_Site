import React from 'react';

export default function MyProjects() {
    const projects = ['Greenfield Housing', 'Central Mall Renovation', 'Riverside Tower'];

    return (
        <div className="grid gap-4 xl:grid-cols-3">
            {projects.map((project) => (
                <article key={project} className="portal-card p-5">
                    <h2 className="portal-section-title">{project}</h2>
                    <p className="portal-muted mt-2">Only assigned projects show here for the manager.</p>
                </article>
            ))}
        </div>
    );
}