export const roleDashboardConfig = {
    SUPER_ADMIN: {
        title: 'Super Admin Dashboard',
        menu: [
            { key: 'platform_overview', shortLabel: 'PO', label: 'Platform Overview' },
            { key: 'companies', shortLabel: 'CO', label: 'Companies' },
            { key: 'subscriptions', shortLabel: 'SU', label: 'Subscriptions' },
            { key: 'users_management', shortLabel: 'UM', label: 'Users Management' },
            { key: 'revenue_analytics', shortLabel: 'RA', label: 'Revenue Analytics' },
            { key: 'system_settings', shortLabel: 'SS', label: 'System Settings' },
            { key: 'global_notifications', shortLabel: 'GN', label: 'Global Notifications' }
        ]
    },
    COMPANY_ADMIN: {
        title: 'Company Admin Dashboard',
        menu: [
            { key: 'company_dashboard', shortLabel: 'CD', label: 'Company Dashboard' },
            { key: 'projects', shortLabel: 'PR', label: 'Projects' },
            { key: 'workers', shortLabel: 'WO', label: 'Workers' },
            { key: 'inventory', shortLabel: 'IN', label: 'Inventory' },
            { key: 'finance', shortLabel: 'FI', label: 'Finance' },
            { key: 'invoices', shortLabel: 'IV', label: 'Invoices' },
            { key: 'clients', shortLabel: 'CL', label: 'Clients' },
            { key: 'reports', shortLabel: 'RE', label: 'Reports' },
            { key: 'company_settings', shortLabel: 'CS', label: 'Company Settings' }
        ]
    },
    PROJECT_MANAGER: {
        title: 'Project Manager Dashboard',
        menu: [
            { key: 'overview', shortLabel: 'OV', label: 'Overview' },
            { key: 'my_projects', shortLabel: 'MP', label: 'My Projects' },
            { key: 'tasks', shortLabel: 'TA', label: 'Tasks' },
            { key: 'milestones', shortLabel: 'MI', label: 'Milestones' },
            { key: 'workers_assigned', shortLabel: 'WA', label: 'Workers Assigned' },
            { key: 'site_updates', shortLabel: 'UP', label: 'Site Updates' },
            { key: 'progress_reports', shortLabel: 'RP', label: 'Progress Reports' }
        ]
    },
    SITE_ENGINEER: {
        title: 'Site Engineer Dashboard',
        menu: [
            { key: 'dashboard', shortLabel: 'DA', label: 'Dashboard' },
            { key: 'assigned_site', shortLabel: 'AS', label: 'Assigned Site' },
            { key: 'tasks', shortLabel: 'TA', label: 'Tasks' },
            { key: 'upload_progress', shortLabel: 'UP', label: 'Upload Progress' },
            { key: 'site_updates', shortLabel: 'SU', label: 'Site Updates' },
            { key: 'material_requests', shortLabel: 'MR', label: 'Material Requests' }
        ]
    },
    ACCOUNTANT: {
        title: 'Accountant Dashboard',
        menu: [
            { key: 'finance_overview', shortLabel: 'FO', label: 'Finance Overview' },
            { key: 'expenses', shortLabel: 'EX', label: 'Expenses' },
            { key: 'invoices', shortLabel: 'IV', label: 'Invoices' },
            { key: 'payments', shortLabel: 'PA', label: 'Payments' },
            { key: 'profit_loss_reports', shortLabel: 'PL', label: 'Profit/Loss Reports' },
            { key: 'material_costing', shortLabel: 'MC', label: 'Material Costing' }
        ]
    },
    CLIENT: {
        title: 'Client Dashboard',
        menu: [
            { key: 'project_overview', shortLabel: 'PO', label: 'Project Overview' },
            { key: 'my_project', shortLabel: 'MP', label: 'My Project' },
            { key: 'progress_gallery', shortLabel: 'PG', label: 'Progress Gallery' },
            { key: 'invoices', shortLabel: 'IV', label: 'Invoices' },
            { key: 'payments', shortLabel: 'PA', label: 'Payments' },
            { key: 'approvals', shortLabel: 'AP', label: 'Approvals' }
        ]
    }
};

export const defaultMetrics = [
    { label: 'Active Projects', value: '18' },
    { label: 'Workers On Site', value: '246' },
    { label: 'Pending Tasks', value: '39' },
    { label: 'Budget Burn Rate', value: '72%' }
];