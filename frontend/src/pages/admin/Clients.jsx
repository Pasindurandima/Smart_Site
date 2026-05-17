import React from 'react';

export default function Clients() {
    const clients = [
        { name: 'ABC Holdings', projects: 3, contact: 'Nimal Perera' },
        { name: 'Ceylon Retail Group', projects: 2, contact: 'Sana De Silva' },
        { name: 'Prime Estates', projects: 5, contact: 'Imran Khan' }
    ];

    return (
        <section className="grid gap-4 xl:grid-cols-3">
            {clients.map((client) => (
                <article key={client.name} className="portal-card p-5">
                    <h2 className="portal-section-title">{client.name}</h2>
                    <p className="portal-muted mt-1">Contact: {client.contact}</p>
                    <p className="mt-4 text-sm font-medium text-slate-700">Assigned Projects: {client.projects}</p>
                </article>
            ))}
        </section>
    );
}