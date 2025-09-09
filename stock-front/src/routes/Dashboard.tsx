import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddPortfolioModal from '../components/AddPortfolioModal';
import AddHoldingModal from '../components/AddHoldingModal';
import { api } from '../services/api';


interface Holding { id: string; schemeCode: string; units: number; avgPrice: number; }
interface Portfolio { id: string; name: string; currency: string; holdings: Holding[] }

export default function Dashboard() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [showAddPortfolio, setShowAddPortfolio] = useState(false);
    const [addingHoldingFor, setAddingHoldingFor] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchPortfolios = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/portfolios');
            setPortfolios(res.data);
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Failed to fetch portfolios');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPortfolios();
    }, []);


    const createPortfolio = async (name: string, currency?: string) => {
        await api.post('/portfolios', { name, currency });
        await fetchPortfolios();
    };


    const addHolding = async (portfolioId: string, payload: { schemeCode: string; units: number; avgPrice: number }) => {
        await api.post(`/portfolios/${portfolioId}/holdings`, payload);
        await fetchPortfolios();
    };


    return (
        <div>
            <Header />
            <main className="container">
                <div className="row space-between">
                    <h1>Your Portfolios</h1>
                    <button className="btn" onClick={() => setShowAddPortfolio(true)}>New Portfolio</button>
                </div>


                {loading && <p>Loading…</p>}
                {error && <p className="error">{error}</p>}


                <div className="grid">
                    {portfolios.map((p) => (
                        <div className="card" key={p.id}>
                            <div className="row space-between">
                                <h2>{p.name}</h2>
                                <button className="btn secondary" onClick={() => setAddingHoldingFor(p.id)}>Add Holding</button>
                            </div>
                            {p.holdings.length === 0 ? (
                                <p className="muted">No holdings yet.</p>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr><th>Scheme</th><th>Units</th><th>Avg Price (₹)</th></tr>
                                    </thead>
                                    <tbody>
                                        {p.holdings.map((h) => (
                                            <tr key={h.id}>
                                                <td>{h.schemeCode}</td>
                                                <td>{h.units}</td>
                                                <td>{h.avgPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                </div>
            </main>


            {showAddPortfolio && (
                <AddPortfolioModal onCreate={createPortfolio} onClose={() => setShowAddPortfolio(false)} />
            )}


            {addingHoldingFor && (
                <AddHoldingModal
                    portfolioId={addingHoldingFor}
                    onCreate={(payload) => addHolding(addingHoldingFor, payload)}
                    onClose={() => setAddingHoldingFor(null)}
                />
            )}
        </div>
    );
}