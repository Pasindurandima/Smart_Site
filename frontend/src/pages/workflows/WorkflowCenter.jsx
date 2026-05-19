import React, { useEffect, useMemo, useState } from 'react';
import { createWorkflowEvent, getWorkflowEvents, getWorkflowTypes, getWorkflowTypesByRole } from '../../api/workflowApi';

const masterFlow = [
    'Company Registers',
    'Subscription Activated',
    'Admin Creates Project',
    'Manager Plans Tasks',
    'Engineer Executes Site Work',
    'Workers Perform Construction',
    'Progress Uploaded',
    'Client Monitors Progress',
    'Accountant Handles Finance',
    'Reports Generated',
    'Project Completed'
];

const roleActionShortcuts = {
    SUPER_ADMIN: [
        { label: 'Companies', route: 'companies' },
        { label: 'Subscriptions', route: 'subscriptions' },
        { label: 'Users', route: 'users' },
        { label: 'Revenue', route: 'revenue' },
        { label: 'Analytics', route: 'analytics' },
        { label: 'Settings', route: 'settings' }
    ],
    COMPANY_ADMIN: [
        { label: 'Create Project', route: 'create-project' },
        { label: 'Projects', route: 'projects' },
        { label: 'Add Worker', route: 'add-worker' },
        { label: 'Workers', route: 'workers' },
        { label: 'Add Material', route: 'add-material' },
        { label: 'Inventory', route: 'inventory' },
        { label: 'Finance', route: 'finance' },
        { label: 'Invoices', route: 'invoices' },
        { label: 'Clients', route: 'clients' },
        { label: 'Reports', route: 'reports' }
    ],
    PROJECT_MANAGER: [
        { label: 'My Projects', route: 'my-projects' },
        { label: 'Project Board', route: 'project-board' },
        { label: 'Tasks', route: 'tasks' },
        { label: 'Milestones', route: 'milestones' },
        { label: 'Progress', route: 'progress' },
        { label: 'Reports', route: 'reports' }
    ],
    SITE_ENGINEER: [
        { label: 'Assigned Site', route: 'assigned-site' },
        { label: 'Daily Updates', route: 'daily-updates' },
        { label: 'Upload Progress', route: 'upload-progress' },
        { label: 'Task List', route: 'task-list' },
        { label: 'Material Request', route: 'material-request' },
        { label: 'Attendance', route: 'attendance' }
    ],
    ACCOUNTANT: [
        { label: 'Expenses', route: 'expenses' },
        { label: 'Add Expense', route: 'add-expense' },
        { label: 'Invoices', route: 'invoices' },
        { label: 'Generate Invoice', route: 'generate-invoice' },
        { label: 'Payments', route: 'payments' },
        { label: 'Profit/Loss', route: 'profit-loss' },
        { label: 'Budget', route: 'budget' },
        { label: 'Reports', route: 'reports' }
    ],
    CLIENT: [
        { label: 'My Project', route: 'my-project' },
        { label: 'Timeline', route: 'timeline' },
        { label: 'Progress Gallery', route: 'gallery' },
        { label: 'Invoices', route: 'invoices' },
        { label: 'Payments', route: 'payments' },
        { label: 'Approvals', route: 'approvals' },
        { label: 'Profile', route: 'profile' }
    ]
};

const workflowRouteMap = {
    SAAS_PLATFORM: ['companies', 'subscriptions', 'users', 'analytics', 'settings'],
    COMPANY_REGISTRATION: ['companies', 'subscriptions', 'settings'],
    SUBSCRIPTION_MANAGEMENT: ['subscriptions', 'companies', 'settings'],
    PROJECT_SETUP: ['create-project', 'projects', 'clients'],
    WORKER_MANAGEMENT: ['add-worker', 'workers'],
    INVENTORY_MANAGEMENT: ['add-material', 'inventory'],
    FINANCE_MONITORING: ['finance', 'expenses', 'invoices', 'payments'],
    PROJECT_EXECUTION: ['my-projects', 'project-board', 'tasks', 'milestones', 'progress', 'reports'],
    SITE_EXECUTION: ['assigned-site', 'daily-updates', 'upload-progress', 'task-list', 'material-request', 'attendance'],
    EXPENSE_MANAGEMENT: ['expenses', 'add-expense', 'invoices', 'generate-invoice', 'payments', 'profit-loss', 'budget', 'reports'],
    CLIENT_MONITORING: ['my-project', 'timeline', 'gallery', 'invoices', 'payments', 'approvals'],
    NOTIFICATION: ['dashboard', 'invoices', 'payments', 'reports'],
    AI_DELAY_PREDICTION: ['reports', 'projects'],
    AI_BUDGET_FORECAST: ['reports', 'finance']
};

const saasWorkflowSteps = [
    'Company registers',
    'Super admin verifies company',
    'Subscription plan selected',
    'Tenant workspace activated',
    'Admin login and onboarding',
    'Projects/workers/finance setup',
    'Operations begin',
    'Client progress monitoring',
    'Invoices and payments managed',
    'Analytics and renewal tracked'
];

function getRoleActions(role) {
    return roleActionShortcuts[role] || [];
}

function getWorkflowRoutes(code) {
    return workflowRouteMap[code] || [];
}

export default function WorkflowCenter({ user, role: roleOverride, onNavigate }) {
    const role = roleOverride || user?.role || 'CLIENT';
    const [workflowTypes, setWorkflowTypes] = useState([]);
    const [roleWorkflowTypes, setRoleWorkflowTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [form, setForm] = useState({
        projectId: '',
        workType: '',
        title: '',
        description: '',
        actorRole: role,
        status: 'PENDING'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            setError('');

            try {
                const [types, byRole, recentEvents] = await Promise.all([
                    getWorkflowTypes(),
                    getWorkflowTypesByRole(role),
                    getWorkflowEvents({})
                ]);

                if (!mounted) return;

                const normalizedTypes = Array.isArray(types) ? types : [];
                const normalizedRoleTypes = Array.isArray(byRole) ? byRole : [];
                const normalizedEvents = Array.isArray(recentEvents) ? recentEvents : [];

                setWorkflowTypes(normalizedTypes);
                setRoleWorkflowTypes(normalizedRoleTypes);
                setEvents(normalizedEvents);

                const initialType = normalizedRoleTypes[0]?.code || normalizedTypes[0]?.code || '';
                setSelectedWorkType(initialType);
                setForm((current) => ({
                    ...current,
                    workType: initialType,
                    title: current.title || `${role.replace(/_/g, ' ')} workflow update`,
                    actorRole: current.actorRole || role
                }));
            } catch (loadError) {
                if (mounted) {
                    setError(loadError.message || 'Unable to load workflows');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [role]);

    const selectedWorkflow = useMemo(
        () => roleWorkflowTypes.find((item) => item.code === selectedWorkType) || workflowTypes.find((item) => item.code === selectedWorkType) || null,
        [roleWorkflowTypes, selectedWorkType, workflowTypes]
    );

    const roleActions = useMemo(() => getRoleActions(role), [role]);
    const workflowRoutes = useMemo(() => getWorkflowRoutes(selectedWorkflow?.code), [selectedWorkflow?.code]);
    const canRecordWorkflow = roleWorkflowTypes.length > 0 && Boolean(selectedWorkflow);

    const summary = useMemo(() => ({
        totalTypes: workflowTypes.length,
        roleTypes: roleWorkflowTypes.length,
        recentEvents: events.length
    }), [events.length, roleWorkflowTypes.length, workflowTypes.length]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const payload = {
                projectId: form.projectId ? Number(form.projectId) : null,
                workType: form.workType,
                title: form.title,
                description: form.description,
                actorRole: form.actorRole,
                status: form.status
            };

            await createWorkflowEvent(payload);
            const refreshedEvents = await getWorkflowEvents({});
            setEvents(Array.isArray(refreshedEvents) ? refreshedEvents : []);
            setSuccess('Workflow event recorded successfully.');
            setForm((current) => ({
                ...current,
                title: '',
                description: '',
                projectId: ''
            }));
        } catch (saveError) {
            setError(saveError.message || 'Unable to record workflow event');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="portal-card p-6">Loading workflow center...</div>;
    }

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-sky-600">Workflow Center</p>
                        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Complete Construction ERP Workflow</h2>
                        <p className="mt-2 max-w-3xl text-sm text-slate-600">
                            Browse the full SaaS flow, role-specific process steps, and record actual workflow events against projects.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate?.('dashboard')}
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <article className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Workflow Types</p>
                        <h3 className="mt-2 text-3xl font-semibold text-slate-900">{summary.totalTypes}</h3>
                    </article>
                    <article className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Role Workflows</p>
                        <h3 className="mt-2 text-3xl font-semibold text-slate-900">{summary.roleTypes}</h3>
                    </article>
                    <article className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Recent Events</p>
                        <h3 className="mt-2 text-3xl font-semibold text-slate-900">{summary.recentEvents}</h3>
                    </article>
                </div>
            </section>

            <section className="portal-card p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="portal-section-title">Role Shortcuts</h3>
                        <p className="portal-muted">Open the existing CRUD screens that support this workflow.</p>
                    </div>
                    <span className="badge badge-blue">{role.replace(/_/g, ' ')}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    {roleActions.map((action) => (
                        <button
                            key={action.route}
                            type="button"
                            onClick={() => onNavigate?.(action.route)}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </section>

            {error ? <section className="portal-card p-4 text-rose-600">{error}</section> : null}
            {success ? <section className="portal-card p-4 text-emerald-700">{success}</section> : null}

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <article className="portal-card p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h3 className="portal-section-title">Master Flow</h3>
                            <p className="portal-muted">Platform-to-project lifecycle</p>
                        </div>
                        <span className="badge badge-green">End-to-End</span>
                    </div>

                    <ol className="mt-5 space-y-3">
                        {masterFlow.map((step, index) => (
                            <li key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                                    {index + 1}
                                </span>
                                <span className="text-sm font-medium text-slate-800">{step}</span>
                            </li>
                        ))}
                    </ol>
                </article>

                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Record Workflow Event</h3>
                    <p className="portal-muted">Log site, finance, inventory, or client workflow activity.</p>

                    {!canRecordWorkflow ? (
                        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                            No workflow actions are currently assigned to this role.
                        </div>
                    ) : null}

                    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                value={form.projectId}
                                onChange={(e) => setForm((current) => ({ ...current, projectId: e.target.value }))}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                                placeholder="Project ID (optional)"
                            />
                            <select
                                value={form.workType}
                                onChange={(e) => {
                                    setSelectedWorkType(e.target.value);
                                    setForm((current) => ({ ...current, workType: e.target.value }));
                                }}
                                disabled={!canRecordWorkflow}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                            >
                                {(roleWorkflowTypes.length ? roleWorkflowTypes : workflowTypes).map((item) => (
                                    <option key={item.code} value={item.code}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            value={form.title}
                            onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                            placeholder="Workflow event title"
                        />

                        <textarea
                            value={form.description}
                            onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                            rows={4}
                            placeholder="Workflow event description"
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                value={form.actorRole}
                                onChange={(e) => setForm((current) => ({ ...current, actorRole: e.target.value }))}
                                readOnly
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                                placeholder="Actor role"
                            />
                            <select
                                value={form.status}
                                onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="BLOCKED">BLOCKED</option>
                                <option value="APPROVED">APPROVED</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={saving || !canRecordWorkflow}
                            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {saving ? 'Saving...' : 'Record Workflow Event'}
                        </button>
                    </form>
                </article>
            </section>

            {role === 'SUPER_ADMIN' ? (
                <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className="portal-card p-6">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h3 className="portal-section-title">SaaS Subscription Workflow</h3>
                                <p className="portal-muted">Company onboarding, plan selection, activation, and renewal.</p>
                            </div>
                            <span className="badge badge-green">Super Admin</span>
                        </div>

                        <div className="mt-5 space-y-3">
                            {saasWorkflowSteps.map((step, index) => (
                                <div key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-slate-800">{step}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="portal-card p-6">
                        <h3 className="portal-section-title">Platform Controls</h3>
                        <p className="portal-muted">Direct access to SaaS owner operations.</p>

                        <div className="mt-5 space-y-3">
                            {workflowRoutes.map((route) => (
                                <button
                                    key={route}
                                    type="button"
                                    onClick={() => onNavigate?.(route)}
                                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
                                >
                                    <span>{route.replace(/-/g, ' ')}</span>
                                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Open</span>
                                </button>
                            ))}
                        </div>
                    </article>
                </section>
            ) : null}

            <section className="grid gap-6 xl:grid-cols-2">
                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Role Workflow Library</h3>
                    <p className="portal-muted">Workflow types available for {role.replace(/_/g, ' ')}</p>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        {(roleWorkflowTypes.length ? roleWorkflowTypes : workflowTypes).map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                onClick={() => setSelectedWorkType(item.code)}
                                className={`rounded-3xl border p-4 text-left transition ${selectedWorkType === item.code ? 'border-sky-300 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">{item.code}</p>
                                <h4 className="mt-2 text-base font-semibold text-slate-900">{item.title}</h4>
                                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                            </button>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h3 className="portal-section-title">Selected Workflow Steps</h3>
                            <p className="portal-muted">{selectedWorkflow?.title || 'Select a workflow type'}</p>
                        </div>
                        {selectedWorkflow ? <span className="badge badge-blue">{selectedWorkflow.steps.length} steps</span> : null}
                    </div>

                    <div className="mt-5 space-y-3">
                        {selectedWorkflow?.steps?.map((step) => (
                            <div key={`${selectedWorkflow.code}-${step.order}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h4 className="text-sm font-semibold text-slate-900">Step {step.order}: {step.title}</h4>
                                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{step.actorRole}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                            </div>
                        ))}

                        {!selectedWorkflow ? <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No workflow selected.</div> : null}
                    </div>
                </article>
            </section>

            <section className="portal-card p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="portal-section-title">Recent Workflow Events</h3>
                        <p className="portal-muted">Latest operational history from the backend event log</p>
                    </div>
                    <span className="badge badge-green">Live API</span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {events.slice(0, 6).map((event) => (
                        <article key={event.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{event.workType}</p>
                                    <h4 className="mt-1 text-base font-semibold text-slate-900">{event.title}</h4>
                                </div>
                                <span className="badge badge-blue">{event.status || 'OPEN'}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                                <span>Role: {event.actorRole}</span>
                                <span>•</span>
                                <span>{event.createdAt ? new Date(event.createdAt).toLocaleString() : 'Just now'}</span>
                            </div>
                        </article>
                    ))}

                    {!events.length ? <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No workflow events recorded yet.</div> : null}
                </div>
            </section>
        </div>
    );
}