import {  useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
    const { register } = useAuth();
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
            await register(email, password);
            nav('/login');
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-container">
            <form className="card" onSubmit={onSubmit}>
                <h1>Create account</h1>
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
                    {loading ? 'Creating…' : 'Create account'}
                </button>
                <p className="muted">
                    Have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}