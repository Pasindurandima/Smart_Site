import React from 'react';

export default function ProjectBoard() {
    const columns = {
        'To Do': ['Review permit docs', 'Approve concrete slot'],
        'In Progress': ['Slab casting', 'Material dispatch'],
        Completed: ['Safety inspection', 'Boundary fencing']
    };

    return (
        <section className="grid gap-4 xl:grid-cols-3">
            {Object.entries(columns).map(([title, cards]) => (
                <article key={title} className="portal-card p-5">
                    <h2 className="portal-section-title">{title}</h2>
                    <div className="mt-4 space-y-3">
                        {cards.map((card) => (
                            <div key={card} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{card}</div>
                        ))}
                    </div>
                </article>
            ))}
        </section>
    );
}