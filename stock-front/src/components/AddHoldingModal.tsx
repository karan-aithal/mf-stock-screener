import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
    portfolioId: string;
    onCreate: (payload: { schemeCode: string; units: number; avgPrice: number }) => Promise<void>;
    onClose: () => void;
}


export default function AddHoldingModal({ portfolioId, onCreate, onClose }: Props) {
    const [schemeCode, setSchemeCode] = useState('');
    const [units, setUnits] = useState<number>(0);
    const [avgPrice, setAvgPrice] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onCreate({ schemeCode, units, avgPrice });
            onClose();
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Failed to add holding');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="modal">
            <div className="modal-card">
                <h2>Add Holding</h2>
                <form onSubmit={submit}>
                    <label>
                        Scheme Code
                        <input value={schemeCode} onChange={(e) => setSchemeCode(e.target.value)} required />
                    </label>
                    <div className="row">
                        <label>
                            Units
                            <input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} min={0} step="0.0001" required />
                        </label>
                        <label>
                            Avg. Price (₹)
                            <input type="number" value={avgPrice} onChange={(e) => setAvgPrice(Number(e.target.value))} min={0} step="0.01" required />
                        </label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="row">
                        <button className="btn" disabled={loading}>{loading ? 'Adding…' : 'Add'}</button>
                        <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
