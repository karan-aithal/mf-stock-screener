import {useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
onCreate: (name: string, currency?: string) => Promise<void>;
onClose: () => void;
};


export default function AddPortfolioModal({ onCreate, onClose }: Props) {
const [name, setName] = useState('');
const [currency, setCurrency] = useState('INR');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


const submit = async (e: FormEvent) => {
e.preventDefault();
setLoading(true);
setError(null);
try {
await onCreate(name, currency);
onClose();
} catch (e: any) {
setError(e?.response?.data?.message || 'Failed to create');
} finally {
setLoading(false);
}
};


return (
<div className="modal">
<div className="modal-card">
<h2>New Portfolio</h2>
<form onSubmit={submit}>
<label>
Name
<input value={name} onChange={(e) => setName(e.target.value)} required />
</label>
<label>
Currency
<input value={currency} onChange={(e) => setCurrency(e.target.value)} />
</label>
{error && <p className="error">{error}</p>}
<div className="row">
<button className="btn" disabled={loading}>{loading ? 'Saving…' : 'Create'}</button>
<button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
</div>
</form>
</div>
</div>
);
}