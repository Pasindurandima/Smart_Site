
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

const roles = [
    'SUPER_ADMIN',
    'COMPANY_ADMIN',
    'PROJECT_MANAGER',
    'SITE_ENGINEER',
    'ACCOUNTANT',
    'CLIENT'
];

export default function Login({ onLoginSuccess }) {
    const [mode, setMode] = useState('signin');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [signinData, setSigninData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'CLIENT',
        password: ''
    });

    const setSignInField = (field, value) => {
        setSigninData((prev) => ({ ...prev, [field]: value }));
    };

    const setSignUpField = (field, value) => {
        setSignupData((prev) => ({ ...prev, [field]: value }));
    };

    const login = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.post(`${API_BASE_URL}/login`, signinData);
            setMessage('Login successful. Redirecting to dashboard...');
            onLoginSuccess(res.data);
        } catch (error) {
            setMessage(error?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const signup = async () => {
        setLoading(true);
        setMessage('');
        try {
            await axios.post(`${API_BASE_URL}/signup`, signupData);
            setMessage('Signup successful. Please sign in now.');
            setMode('signin');
            setSigninData({ email: signupData.email, password: '' });
            setSignupData({
                name: '',
                email: '',
                phone: '',
                role: 'CLIENT',
                password: ''
            });
        } catch (error) {
            setMessage(error?.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: '30px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>

            <div style={{ marginBottom: 12 }}>
                <button onClick={() => setMode('signin')} disabled={mode === 'signin'}>Sign In</button>
                <button onClick={() => setMode('signup')} disabled={mode === 'signup'} style={{ marginLeft: 8 }}>Sign Up</button>
            </div>

            {mode === 'signin' ? (
                <>
                    <input
                        placeholder="Email"
                        value={signinData.email}
                        onChange={(e) => setSignInField('email', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={signinData.password}
                        onChange={(e) => setSignInField('password', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <button onClick={login} disabled={loading} style={{ width: '100%', padding: 10 }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder="Full Name"
                        value={signupData.name}
                        onChange={(e) => setSignUpField('name', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <input
                        placeholder="Email"
                        value={signupData.email}
                        onChange={(e) => setSignUpField('email', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <input
                        placeholder="Phone"
                        value={signupData.phone}
                        onChange={(e) => setSignUpField('phone', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <select
                        value={signupData.role}
                        onChange={(e) => setSignUpField('role', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                    <input
                        placeholder="Password (min 6 chars)"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignUpField('password', e.target.value)}
                        style={{ width: '100%', marginBottom: 10, padding: 8 }}
                    />
                    <button onClick={signup} disabled={loading} style={{ width: '100%', padding: 10 }}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </>
            )}

            {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </div>
    );
}
