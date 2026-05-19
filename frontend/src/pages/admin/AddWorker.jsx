import React from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';
import { createOperationalRecord } from '../../api/operationsApi';

export default function AddWorker({ user, onNavigate }) {
    const [form, setForm] = React.useState({ name: '', phone: '', role: 'Mason', salary: '', site: 'Site A' });
    const [saving, setSaving] = React.useState(false);
    const [message, setMessage] = React.useState('');

    async function saveWorker() {
        setSaving(true);
        setMessage('');
        await createOperationalRecord({
            recordType: 'WORKER',
            projectId: null,
            title: form.name || 'Worker registration',
            amount: form.salary ? Number(form.salary) : null,
            quantity: 1,
            status: 'ACTIVE',
            notes: `Phone: ${form.phone || '-'} | Role: ${form.role} | Site: ${form.site}`,
            actorRole: user?.role || 'COMPANY_ADMIN'
        });
        await createWorkflowEvent({
            projectId: null,
            workType: 'WORKER_MANAGEMENT',
            title: `Worker added: ${form.name || 'new worker'}`,
            description: 'A new worker was registered from the company admin workspace.',
            actorRole: user?.role || 'COMPANY_ADMIN',
            status: 'COMPLETED'
        });
        setMessage('Worker saved successfully.');
        setSaving(false);
    }

    return (
        <div className="portal-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="portal-section-title">Add Worker</h2>
                    <p className="portal-muted">Register a new worker and assign site details.</p>
                </div>
                <span className="badge badge-blue">HR Form</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Name" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Phone" />
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400">
                    <option>Mason</option>
                    <option>Electrician</option>
                    <option>Helper</option>
                    <option>Supervisor</option>
                    <option>Engineer</option>
                </select>
                <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Salary" />
                <select value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 md:col-span-2">
                    <option>Site A</option>
                    <option>Site B</option>
                    <option>Site C</option>
                </select>
            </div>

            {message ? <div className="mt-4 text-sm text-emerald-600">{message}</div> : null}
            <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={saveWorker} disabled={saving} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save Worker'}</button>
                <button onClick={() => onNavigate?.('workers')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Back to Workers</button>
            </div>
        </div>
    );
}