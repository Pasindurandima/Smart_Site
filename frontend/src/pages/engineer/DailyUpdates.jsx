import React, { useState } from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';
import { createOperationalRecord } from '../../api/operationsApi';

export default function DailyUpdates({ user }) {
    const [list, setList] = useState([
        { date: '2026-05-12', note: 'Completed trenching works' },
        { date: '2026-05-10', note: 'Site clearing and layout' }
    ]);

    const [form, setForm] = useState({ date: '', note: '', weather: '' });

    function submit(e) {
        e.preventDefault();
        const entry = { date: form.date || new Date().toISOString().slice(0, 10), note: form.note };
        setList((s) => [entry, ...s]);
        createOperationalRecord({
            recordType: 'DAILY_UPDATE',
            projectId: null,
            title: 'Daily site update',
            amount: null,
            quantity: null,
            status: 'SUBMITTED',
            notes: `${form.note} | Weather: ${form.weather || '-'}`,
            actorRole: user?.role || 'SITE_ENGINEER'
        }).catch(() => {});
        createWorkflowEvent({
            projectId: null,
            workType: 'DAILY_SITE_UPDATES',
            title: 'Daily site update submitted',
            description: form.note || 'Site daily update logged from engineer workspace.',
            actorRole: user?.role || 'SITE_ENGINEER',
            status: 'COMPLETED'
        }).catch(() => {});
        setForm({ date: '', note: '', weather: '' });
    }

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <h2 className="portal-section-title">Daily Update</h2>
                <form onSubmit={submit} className="mt-3 space-y-2">
                    <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Date (YYYY-MM-DD)" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                    <input value={form.weather} onChange={(e) => setForm({ ...form, weather: e.target.value })} placeholder="Weather" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                    <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Work completed today / Issues" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" rows={3} />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white">Submit Update</button>
                    </div>
                </form>
            </section>

            <section className="portal-card p-4">
                <h3 className="font-semibold">History</h3>
                <div className="mt-3 space-y-2">
                    {list.map((l) => (
                        <div key={l.date + l.note} className="rounded-lg bg-slate-50 p-3">
                            <div className="text-sm text-slate-500">{l.date}</div>
                            <div className="font-medium text-slate-900">{l.note}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}