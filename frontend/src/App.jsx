
import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';

import './styles/marketing.css';

export default function App() {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('erpUser');
        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch (error) {
            console.warn('Invalid erpUser data in localStorage, clearing it.', error);
            localStorage.removeItem('erpUser');
            return null;
        }
    });

    const handleLoginSuccess = (loggedInUser) => {
        localStorage.setItem('erpUser', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('erpUser');
        setUser(null);
    };

    return <AppRoutes user={user} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />;
}
