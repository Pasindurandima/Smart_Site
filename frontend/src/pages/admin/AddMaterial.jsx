import React from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';
import { createOperationalRecord } from '../../api/operationsApi';

export default function AddMaterial({ user, onNavigate }) {
    const [form, setForm] = React.useState({ name: '', quantity: '', supplier: '', cost: '', project: 'Greenfield Block A' });
    const [saving, setSaving] = React.useState(false);
    const [message, setMessage] = React.useState('');

    async function saveMaterial() {
        setSaving(true);
        setMessage('');
        await createOperationalRecord({
            recordType: 'MATERIAL',
            projectId: null,
            title: form.name || 'Material stock entry',
            amount: form.cost ? Number(form.cost) : null,
            quantity: form.quantity ? Number(form.quantity) : null,
            status: 'STOCKED',
            notes: `Supplier: ${form.supplier || '-'} | Project: ${form.project}`,
            actorRole: user?.role || 'COMPANY_ADMIN'
        });
        await createWorkflowEvent({
            projectId: null,
            workType: 'INVENTORY_MANAGEMENT',
            title: `Material added: ${form.name || 'new stock item'}`,
            description: 'New inventory material was added from the company admin workspace.',
            actorRole: user?.role || 'COMPANY_ADMIN',
            status: 'COMPLETED'
        });
        setMessage('Material saved successfully.');
        setSaving(false);
    }

    return (
        <div className="portal-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="portal-section-title">Add Material</h2>
                    <p className="portal-muted">Register new stock items and attach them to a project.</p>
                </div>
                <span className="badge badge-blue">Inventory Form</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 md:col-span-2" placeholder="Material name" />
                <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Quantity" />
                <input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Supplier" />
                <input value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder="Cost" />
                <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400">
                    <option>Project link</option>
                    <option>Greenfield Block A</option>
                    <option>Greenfield Block B</option>
                </select>
            </div>

            {message ? <div className="mt-4 text-sm text-emerald-600">{message}</div> : null}
            <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={saveMaterial} disabled={saving} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save Material'}</button>
                <button onClick={() => onNavigate?.('inventory')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Back to Inventory</button>
            </div>
        </div>
    );
}