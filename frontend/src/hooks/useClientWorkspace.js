import { useEffect, useMemo, useState } from 'react';

const CLIENT_API = '/api/clients';
const PROJECT_API = '/api/projects';
const API_FALLBACK_BASE = 'http://localhost:8080';

function getStoredUser() {
    try {
        const raw = localStorage.getItem('erpUser');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function buildAuthHeaders(extraHeaders = {}) {
    const user = getStoredUser();
    const headers = { ...extraHeaders };
    if (user?.token) {
        headers.Authorization = `Bearer ${user.token}`;
    }
    if (user?.companyId != null) {
        headers['X-Company-Id'] = String(user.companyId);
    }
    return headers;
}

function isHtmlResponse(text) {
    if (!text) return false;
    const value = text.trim().toLowerCase();
    return value.startsWith('<!doctype html') || value.startsWith('<html');
}

async function fetchJsonWithFallback(url, options = {}) {
    const requestOptions = {
        ...options,
        headers: buildAuthHeaders(options.headers || {})
    };

    const primary = await fetch(url, requestOptions);
    const primaryText = await primary.text();

    if (primary.ok && !isHtmlResponse(primaryText)) {
        return primaryText ? JSON.parse(primaryText) : null;
    }

    const fallbackUrl = `${API_FALLBACK_BASE}${url}`;
    const fallback = await fetch(fallbackUrl, requestOptions);
    const fallbackText = await fallback.text();

    if (!fallback.ok) {
        throw new Error(`API request failed (${fallback.status})`);
    }

    if (isHtmlResponse(fallbackText)) {
        throw new Error('Invalid response format from API');
    }

    return fallbackText ? JSON.parse(fallbackText) : null;
}

async function postJsonWithFallback(url, body) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return await fetchJsonWithFallback(url, options);
}

function parseNumeric(value) {
    if (value == null || value === '') return null;
    const number = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(number) ? number : null;
}

export function formatCurrency(value) {
    const number = parseNumeric(value);
    if (number == null) return '-';
    return `Rs. ${number.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getStatusTone(status) {
    if (!status) return 'badge-slate';
    const normalized = status.toLowerCase();
    if (normalized.includes('complete') || normalized.includes('paid') || normalized.includes('success')) return 'badge-green';
    if (normalized.includes('delay') || normalized.includes('pending') || normalized.includes('overdue')) return 'badge-rose';
    return 'badge-blue';
}

function getProjectStatusTone(status) {
    if (!status) return 'badge-slate';
    const normalized = status.toLowerCase();
    if (normalized.includes('complete')) return 'badge-green';
    if (normalized.includes('delay')) return 'badge-rose';
    return 'badge-blue';
}

function buildTimelineStages(project) {
    if (!project) {
        return [];
    }

    const status = project.status ? project.status.toLowerCase() : '';
    const start = project.startDate ? new Date(project.startDate) : null;
    const end = project.endDate ? new Date(project.endDate) : null;
    const totalDuration = start && end && end > start ? end.getTime() - start.getTime() : 0;

    const stageNames = ['Foundation', 'Structure', 'Plumbing', 'Electrical', 'Finishing'];
    const statusMap = stageNames.map((_, index) => {
        if (status.includes('complete')) return 'completed';
        if (status.includes('delay')) return index === 1 ? 'delayed' : index === 0 ? 'completed' : 'pending';
        if (index === 0) return 'completed';
        if (index === 1) return 'active';
        return 'pending';
    });

    return stageNames.map((title, index) => {
        const stageStart = start && totalDuration ? new Date(start.getTime() + (index * totalDuration) / stageNames.length) : null;
        const stageEnd = start && totalDuration ? new Date(start.getTime() + ((index + 1) * totalDuration) / stageNames.length) : null;
        return {
            title,
            status: statusMap[index],
            dates: stageStart && stageEnd ? `${stageStart.toLocaleDateString()} - ${stageEnd.toLocaleDateString()}` : 'Date TBD'
        };
    });
}

function computeProgress(project) {
    if (!project) return null;
    if (project.startDate && project.endDate) {
        const start = new Date(project.startDate);
        const end = new Date(project.endDate);
        const now = new Date();
        if (start < end) {
            const total = end.getTime() - start.getTime();
            const completed = Math.min(Math.max(now.getTime() - start.getTime(), 0), total);
            return Math.round((completed / total) * 100);
        }
    }

    if (project.status) {
        const normalized = project.status.toLowerCase();
        if (normalized.includes('complete')) return 100;
        if (normalized.includes('delay')) return 55;
        return 72;
    }

    return null;
}

export function useClientWorkspace(user) {
    const [client, setClient] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            setClient(null);
            setProjects([]);

            if (!user?.email) {
                setError('Client email not available');
                setLoading(false);
                return;
            }

            try {
                const search = encodeURIComponent(user.email.trim());
                const clientList = (await fetchJsonWithFallback(`${CLIENT_API}/search?q=${search}`)) || [];

                let matchedClient = clientList.find((entry) => entry.email?.toLowerCase() === user.email.trim().toLowerCase()) || clientList[0];

                if (!matchedClient) {
                    // Auto-provision a client record for this user to avoid blocking the UI
                    const createReq = {
                        name: user.name || user.email.split('@')[0],
                        company: null,
                        email: user.email,
                        phone: null,
                        address: null,
                        notes: 'Auto-provisioned client'
                    };

                    try {
                        const created = await postJsonWithFallback(CLIENT_API, createReq);
                        matchedClient = created;
                    } catch (createErr) {
                        throw new Error('No client record found for this account');
                    }
                }

                const projectList = (await fetchJsonWithFallback(`${PROJECT_API}/by-client/${matchedClient.id}`)) || [];

                if (mounted) {
                    setClient(matchedClient);
                    setProjects(projectList || []);
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message || 'Unable to load client workspace');
                    console.error('Client workspace error:', err);
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
    }, [user?.email]);

    const selectedProject = useMemo(() => projects.length > 0 ? projects[0] : null, [projects]);
    const projectProgress = useMemo(() => computeProgress(selectedProject), [selectedProject]);
    const timelineStages = useMemo(() => buildTimelineStages(selectedProject), [selectedProject]);
    const projectStatusTone = useMemo(() => getProjectStatusTone(selectedProject?.status), [selectedProject?.status]);
    const projectCount = projects.length;

    return {
        client,
        projects,
        selectedProject,
        projectProgress,
        timelineStages,
        projectStatusTone,
        projectCount,
        loading,
        error,
        formatCurrency,
        getStatusTone
    };
}
