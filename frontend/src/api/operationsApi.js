const BASE_URL = '/api/operations';

async function parseResponse(response) {
    const text = await response.text();

    if (!response.ok) {
        const message = text && text.trim() ? text.slice(0, 180) : `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        throw new Error('Invalid JSON response from operations API');
    }
}

export async function createOperationalRecord(payload) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return parseResponse(response);
}