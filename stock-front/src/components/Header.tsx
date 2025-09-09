import { useAuth } from '../hooks/useAuth';


export default function Header() {
    const { logout } = useAuth();
    return (
        <header className="header">
            <div className="brand">MF Tracker</div>
            <nav>
                <button className="btn" onClick={logout}>Logout</button>
            </nav>
        </header>
    );
}