const API_BASE = '/api/site-progress';
const API_FALLBACK_BASE = 'http://localhost:8080';

function isHtmlResponse(text) {
    if (!text) return false;
    const normalized = text.trim().toLowerCase();
    return normalized.startsWith('<!doctype html') || normalized.startsWith('<html');
}

async function request(path = '', options = {}) {
    const primary = await fetch(`${API_BASE}${path}`, options);
    const primaryText = await primary.text();

    if (primary.ok && !isHtmlResponse(primaryText)) {
        return primaryText ? JSON.parse(primaryText) : null;
    }

    const fallback = await fetch(`${API_FALLBACK_BASE}${API_BASE}${path}`, options);
    const fallbackText = await fallback.text();

    if (!fallback.ok) {
        throw new Error(`Site progress API request failed (${fallback.status})`);
    }

    if (isHtmlResponse(fallbackText)) {
        throw new Error('Invalid response format from site progress API');
    }

    return fallbackText ? JSON.parse(fallbackText) : null;
}

export function listSiteProgress(projectId) {
    const query = projectId ? `?projectId=${encodeURIComponent(projectId)}` : '';
    return request(query);
}

export function createSiteProgress(payload) {
    return request('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}