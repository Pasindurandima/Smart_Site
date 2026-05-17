import React, { useMemo, useState } from 'react';
import Topbar from '../components/dashboard/Topbar';
import Sidebar from '../components/dashboard/Sidebar';
import { defaultMetrics, roleDashboardConfig } from '../config/dashboardConfig';

function MetricsRow({ metrics }) {
    return (
        <section className="metrics-row">
            {metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                    <p className="metric-label">{metric.label}</p>
                    <h3 className="metric-value">{metric.value}</h3>
                </article>
            ))}
        </section>
    );
}

function DataTable({ title }) {
    return (
        <section className="panel">
            <div className="panel-head">
                <h3>{title}</h3>
                <button className="panel-action">Create New</button>
            </div>
            <table className="erp-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>City Mall Phase 2</td>
                        <td>Ongoing</td>
                        <td>Rohan Verma</td>
                        <td>Today</td>
                    </tr>
                    <tr>
                        <td>Bridge Reinforcement</td>
                        <td>Pending</td>
                        <td>Priya Singh</td>
                        <td>Yesterday</td>
                    </tr>
                    <tr>
                        <td>Hospital Block C</td>
                        <td>Completed</td>
                        <td>Amit Shah</td>
                        <td>2 days ago</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

function InsightsPanel() {
    return (
        <section className="panel two-col">
            <article className="sub-panel">
                <h4>AI Delay Prediction</h4>
                <p>Two milestones are at high risk due to material lead-time variance.</p>
                <button className="panel-action">Review Risk Alerts</button>
            </article>
            <article className="sub-panel">
                <h4>Material Shortage Alerts</h4>
                <ul className="clean-list">
                    <li>Rebar 12mm: low stock in Site A</li>
                    <li>Cement OPC: 4 days remaining</li>
                    <li>Waterproof membrane: reorder recommended</li>
                </ul>
            </article>
        </section>
    );
}

function ProjectManagerKanban() {
    return (
        <section className="kanban-grid">
            <article className="kanban-col">
                <h4>Todo</h4>
                <div className="kanban-card">Finalize site permit checklist</div>
                <div className="kanban-card">Approve steel delivery slot</div>
            </article>
            <article className="kanban-col">
                <h4>In Progress</h4>
                <div className="kanban-card">Foundation concrete stage 3</div>
                <div className="kanban-card">Electrical trench routing</div>
            </article>
            <article className="kanban-col">
                <h4>Done</h4>
                <div className="kanban-card">Safety inspection week 20</div>
                <div className="kanban-card">Temporary fencing completed</div>
            </article>
        </section>
    );
}

function EngineerProgressForm() {
    return (
        <section className="panel form-panel">
            <h3>Add Daily Progress</h3>
            <div className="form-grid">
                <input placeholder="Task title" />
                <input placeholder="Site section" />
                <input placeholder="GPS pin (optional)" />
                <select>
                    <option>Task status: In Progress</option>
                    <option>Task status: Completed</option>
                    <option>Task status: Blocked</option>
                </select>
                <textarea placeholder="Progress notes" rows={5} />
            </div>
            <div className="actions-row">
                <button className="panel-action">Upload Images</button>
                <button className="panel-action">Upload Video</button>
                <button className="panel-action">Submit Update</button>
            </div>
        </section>
    );
}

function AccountantFinancePanel() {
    return (
        <section className="panel two-col">
            <article className="sub-panel">
                <h4>Pending Payments</h4>
                <ul className="clean-list">
                    <li>INV-2103: Rs. 340,000 due in 3 days</li>
                    <li>INV-2107: Rs. 120,000 overdue by 2 days</li>
                    <li>INV-2110: Rs. 560,000 due today</li>
                </ul>
            </article>
            <article className="sub-panel">
                <h4>Budget Tracking</h4>
                <p>Monthly expense utilization: 68%</p>
                <p>Estimated profit margin: 17.4%</p>
                <button className="panel-action">Generate PDF Invoice</button>
            </article>
        </section>
    );
}

function ClientSimpleView() {
    return (
        <section className="panel">
            <h3>Project Progress Timeline</h3>
            <ul className="timeline-list">
                <li>Week 1-2: Site preparation completed</li>
                <li>Week 3-6: Foundation completed</li>
                <li>Week 7-9: Structural work in progress</li>
                <li>Next: Electrical and plumbing package</li>
            </ul>
            <div className="actions-row">
                <button className="panel-action">Download Invoice</button>
                <button className="panel-action">Approve Milestone</button>
            </div>
        </section>
    );
}

function ModuleHeading({ title, subtitle }) {
    return (
        <section className="module-heading">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </section>
    );
}

function renderRoleSpecificBlocks(role, activeModule) {
    if (role === 'PROJECT_MANAGER' && (activeModule === 'tasks' || activeModule === 'overview')) {
        return <ProjectManagerKanban />;
    }
    if (role === 'SITE_ENGINEER' && (activeModule === 'upload_progress' || activeModule === 'dashboard')) {
        return <EngineerProgressForm />;
    }
    if (role === 'ACCOUNTANT' && (activeModule === 'finance_overview' || activeModule === 'payments')) {
        return <AccountantFinancePanel />;
    }
    if (role === 'CLIENT') {
        return <ClientSimpleView />;
    }
    return <InsightsPanel />;
}

export default function Dashboard({ user, onLogout }) {
    const config = roleDashboardConfig[user?.role] || roleDashboardConfig.CLIENT;
    const [activeModule, setActiveModule] = useState(config.menu[0].key);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const activeLabel = useMemo(() => {
        const match = config.menu.find((item) => item.key === activeModule);
        return match ? match.label : 'Dashboard';
    }, [activeModule, config.menu]);

    return (
        <div className="erp-shell">
            <Topbar
                user={user}
                onLogout={onLogout}
                onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
            />

            <div className="erp-body">
                <Sidebar
                    items={config.menu}
                    activeKey={activeModule}
                    onSelect={setActiveModule}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
                    mobileOpen={mobileSidebarOpen}
                    onCloseMobile={() => setMobileSidebarOpen(false)}
                />

                <main className="erp-main">
                    <ModuleHeading
                        title={`${config.title} - ${activeLabel}`}
                        subtitle={`Welcome ${user?.name}. You are logged in as ${user?.role}.`}
                    />

                    <MetricsRow metrics={defaultMetrics} />
                    {renderRoleSpecificBlocks(user?.role, activeModule)}
                    <DataTable title={`${activeLabel} Workspace`} />
                </main>
            </div>
        </div>
    );
}