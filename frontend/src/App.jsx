
import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';

export default function App() {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('erpUser');
        return raw ? JSON.parse(raw) : null;
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
