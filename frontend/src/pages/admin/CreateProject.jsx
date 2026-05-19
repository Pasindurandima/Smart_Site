import React, { useEffect, useState } from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';

const API = '/api/projects';

export default function CreateProject({ onNavigate, selectedProjectId }) {
    const [form, setForm] = useState({ name: '', clientId: '', description: '', address: '', status: '', budget: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (selectedProjectId) loadProject(selectedProjectId);
    }, [selectedProjectId]);

    async function loadProject(id) {
        setLoading(true);
        try {
            const res = await fetch(`${API}/${id}`);
            if (!res.ok) throw new Error('Failed to load');
            const data = await res.json();
            setForm({
                name: data.name || '', clientId: data.clientId || '', description: data.description || '', address: data.address || '', status: data.status || '', budget: data.budget || ''
            });
        } catch (err) {
            setError('Unable to load project');
        } finally { setLoading(false); }
    }

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const method = selectedProjectId ? 'PUT' : 'POST';
            const url = selectedProjectId ? `${API}/${selectedProjectId}` : API;
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            if (!res.ok) throw new Error('Save failed');
            if (!selectedProjectId) {
                await createWorkflowEvent({
                    projectId: null,
                    workType: 'PROJECT_SETUP',
                    title: `Project created: ${form.name}`,
                    description: `Project ${form.name} was created from the company admin workspace.`,
                    actorRole: 'COMPANY_ADMIN',
                    status: 'COMPLETED'
                });
            }
            setSuccess(selectedProjectId ? 'Project updated successfully.' : 'Project created successfully.');
            onNavigate?.('projects');
        } catch (err) {
            setError('Save failed');
        } finally { setLoading(false); }
    }

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <h2 className="portal-section-title">{selectedProjectId ? 'Edit Project' : 'Create Project'}</h2>
                {error && <div className="text-sm text-rose-500">{error}</div>}
                {success && <div className="text-sm text-emerald-600">{success}</div>}
                <form onSubmit={submit} className="mt-4 grid gap-4 md:grid-cols-2">
                    <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <input className="input" placeholder="Client ID" value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })} />
                    <input className="input" placeholder="Budget" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
                    <input className="input" placeholder="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
                    <textarea className="input col-span-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    <input className="input col-span-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    <div className="col-span-2 flex items-center gap-2">
                        <button type="submit" disabled={loading} className="rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white">{loading ? 'Saving...' : 'Save'}</button>
                        <button type="button" onClick={() => onNavigate?.('projects')} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}