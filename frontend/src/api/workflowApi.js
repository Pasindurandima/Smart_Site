const BASE_URL = '/api/workflows';

async function readJson(response) {
    const text = await response.text();

    if (!response.ok) {
        const fallback = text && text.trim() ? text.slice(0, 180) : `Request failed with status ${response.status}`;
        throw new Error(fallback);
    }

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        throw new Error('Invalid JSON response from workflow API');
    }
}

async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    return readJson(response);
}

export function getWorkflowTypes() {
    return request('/types');
}

export function getWorkflowTypesByRole(role) {
    return request(`/roles/${encodeURIComponent(role)}`);
}

export function getWorkflowEvents(params = {}) {
    const search = new URLSearchParams();

    if (params.projectId) {
        search.set('projectId', params.projectId);
    }

    if (params.workType) {
        search.set('workType', params.workType);
    }

    const query = search.toString();
    return request(`/events${query ? `?${query}` : ''}`);
}

export function createWorkflowEvent(payload) {
    return request('/events', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}