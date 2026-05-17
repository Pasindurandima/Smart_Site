import React from 'react';

export default function Settings() {
    const sections = ['Profile Settings', 'Company Branding', 'User Roles'];

    return (
        <div className="space-y-6">
            {sections.map((section) => (
                <article key={section} className="portal-card p-6">
                    <h2 className="portal-section-title">{section}</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder={`${section} field 1`} />
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder={`${section} field 2`} />
                    </div>
                </article>
            ))}
        </div>
    );
}