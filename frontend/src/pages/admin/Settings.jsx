import React from 'react';

export default function Settings() {
    const sections = [
        { title: 'Company Profile', items: ['Company name', 'Address', 'Phone', 'Email'] },
        { title: 'User Roles', items: ['Admin permissions', 'Manager permissions', 'Worker permissions'] },
        { title: 'System Settings', items: ['Timezone', 'Currency', 'Working hours'] },
        { title: 'Branding', items: ['Logo upload', 'Theme color', 'Light/Dark mode'] }
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-6 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Company Configuration</p>
                <h2 className="mt-1 text-2xl font-semibold">Settings</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Manage company profile, roles, system values, and branding settings.</p>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
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
                <div className="flex flex-wrap gap-3">
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Settings</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Reset Defaults</button>
                </div>
            </section>
        </div>
    );
}