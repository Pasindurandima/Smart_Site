import React from 'react';

const metrics = [
    { label: 'Progress', value: '72%', tone: 'badge-green' },
    { label: 'Budget', value: 'Rs. 18.4M', tone: 'badge-blue' },
    { label: 'Paid', value: 'Rs. 11.2M', tone: 'badge-green' },
    { label: 'Pending Invoice', value: 'Rs. 1.8M', tone: 'badge-amber' },
    { label: 'Status', value: 'On Track', tone: 'badge-green' }
];

const gallery = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {metrics.map((metric) => (
                    <article key={metric.label} className="portal-card p-5">
                        <p className="portal-muted">{metric.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{metric.value}</h3>
                            <span className={`badge ${metric.tone}`}>{metric.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <article className="portal-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="portal-section-title">Project Overview</h2>
                            <p className="portal-muted">Greenfield Housing Phase 2, Colombo</p>
                        </div>
                        <span className="badge badge-green">On Track</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Start Date</p>
                            <p className="mt-1 text-base font-semibold">12 Jan 2026</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">End Date</p>
                            <p className="mt-1 text-base font-semibold">30 Nov 2026</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Current Stage</p>
                            <p className="mt-1 text-base font-semibold">Structural Work</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Manager</p>
                            <p className="mt-1 text-base font-semibold">Arun Menon</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">Completion</span>
                            <span className="font-semibold text-slate-900">72%</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                            <div className="h-3 w-[72%] rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"></div>
                        </div>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Latest Site Updates</h2>
                    <div className="mt-4 space-y-3">
                        {gallery.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200">
                                <img src={image} alt={`Site update ${index + 1}`} className="h-36 w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className="portal-card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="portal-section-title">Progress Analytics</h2>
                    <span className="badge badge-blue">Live Summary</span>
                </div>
                <div className="grid h-64 grid-cols-7 items-end gap-3">
                    {[24, 34, 28, 47, 56, 64, 72].map((value, index) => (
                        <div key={index} className="flex h-full flex-col justify-end gap-2">
                            <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400" style={{ height: `${value}%` }}></div>
                            <span className="text-center text-xs text-slate-500">W{index + 1}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}