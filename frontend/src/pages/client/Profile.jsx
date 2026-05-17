import React from 'react';

export default function Profile() {
    return (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <section className="portal-card p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-3xl font-semibold text-white">
                    C
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Client Name</h2>
                <p className="portal-muted">ABC Construction Pvt Ltd</p>
                <div className="mt-6 space-y-3 text-left">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Email</p>
                        <p className="font-medium">client@abcconstruction.com</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Phone</p>
                        <p className="font-medium">+94 77 123 4567</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Company</p>
                        <p className="font-medium">ABC Construction Pvt Ltd</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Update Profile</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Full name" />
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Phone number" />
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 md:col-span-2" placeholder="Email address" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
                        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Change Password</button>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Notification Settings</h2>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                        {['Project updates', 'Invoice reminders', 'Milestone approvals'].map((item) => (
                            <label key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                <span>{item}</span>
                                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                            </label>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}