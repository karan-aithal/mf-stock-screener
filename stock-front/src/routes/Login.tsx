import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            nav('/');
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-container">
            <form className="card" onSubmit={onSubmit}>
                <h1>Sign in</h1>
                <label>
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                </label>
                <label>
                    Password
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </label>
                {error && <p className="error">{error}</p>}
                <button className="btn" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
                <p className="muted">
                    No account? <Link to="/register">Create one</Link>
                </p>
            </form>
        </div>
    );
}