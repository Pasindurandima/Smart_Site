import React from 'react';

export default function Settings() {
    const sections = [
        {
            title: 'Security',
            items: ['Password policy', 'JWT settings', 'Session timeout']
        },
        {
            title: 'System',
            items: ['API base URL', 'Email SMTP config', 'Storage config']
        },
        {
            title: 'UI Settings',
            items: ['Theme (Dark/Light)', 'Logo upload', 'Brand colors']
        }
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-6 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">System Configuration</p>
                <h2 className="mt-1 text-2xl font-semibold">Platform Settings</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Configure security, system, and branding settings for the SaaS owner portal.</p>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                {sections.map((section) => (
                    <article key={section.title} className="portal-card p-6">
                        <h3 className="portal-section-title">{section.title}</h3>
                        <div className="mt-4 space-y-3">
                            {section.items.map((item) => (
                                <label key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                    <span>{item}</span>
                                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                                </label>
                            ))}
                        </div>
                    </article>
                ))}
            </section>

            <section className="portal-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Settings</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Reset Defaults</button>
                    <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Upload Logo</button>
                </div>
            </section>
        </div>
    );
}