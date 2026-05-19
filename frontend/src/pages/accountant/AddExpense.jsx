import React from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';
import { createOperationalRecord } from '../../api/operationsApi';

export default function AddExpense({ user, onNavigate }) {
    const [form, setForm] = React.useState({ title: '', amount: '', category: 'Fuel', project: 'Greenfield Block A', date: '', method: 'Cash', notes: '' });
    const [saving, setSaving] = React.useState(false);
    const [message, setMessage] = React.useState('');

    async function saveExpense() {
        setSaving(true);
        setMessage('');
        await createOperationalRecord({
            recordType: 'EXPENSE',
            projectId: null,
            title: form.title || 'Expense entry',
            amount: form.amount ? Number(form.amount) : null,
            quantity: 1,
            status: 'RECORDED',
            notes: `Category: ${form.category} | Project: ${form.project} | Date: ${form.date || '-'} | Method: ${form.method} | ${form.notes}`,
            actorRole: user?.role || 'ACCOUNTANT'
        });
        await createWorkflowEvent({
            projectId: null,
            workType: 'EXPENSE_MANAGEMENT',
            title: `Expense added: ${form.title || 'new expense'}`,
            description: 'A new expense was recorded from the accountant workspace.',
            actorRole: user?.role || 'ACCOUNTANT',
            status: 'COMPLETED'
        });
        setMessage('Expense saved successfully.');
        setSaving(false);
    }

    return (
        <div className="portal-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="portal-section-title">Add Expense</h2>
                    <p className="portal-muted">Create a project-linked expense entry with inline validation.</p>
                </div>
                <span className="badge badge-blue">Finance Entry</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400 md:col-span-2" placeholder="Expense title" />
                <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400" placeholder="Amount" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400">
                    <option>Category: Fuel</option>
                    <option>Category: Material</option>
                    <option>Category: Labor</option>
                </select>
                <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400">
                    <option>Project Selection</option>
                    <option>Greenfield Block A</option>
                    <option>Greenfield Block B</option>
                </select>
                <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400" placeholder="Date" />
                <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400">
                    <option>Payment Method</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Card</option>
                </select>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400 md:col-span-2" rows={5} placeholder="Notes / description" />
            </div>

            {message ? <div className="mt-4 text-sm text-emerald-600">{message}</div> : null}
            <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={saveExpense} disabled={saving} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Create Expense'}</button>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Attach Receipt</button>
                <button onClick={() => onNavigate?.('expenses')} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Back to Expenses</button>
            </div>
        </div>
    );
}