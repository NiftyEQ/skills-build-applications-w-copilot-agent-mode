import { useEffect, useState } from 'react';
import { fetchCollection } from '../App';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { const controller = new AbortController(); fetchCollection('leaderboard', controller.signal).then(setEntries).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message); }); return () => controller.abort(); }, []);
  return <section className="content-panel"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="text-secondary">Celebrate consistency and keep the momentum visible.</p>{error && <div className="alert alert-danger">{error}</div>}<div className="leaderboard-list">{entries.length ? entries.map((entry, index) => <div className="leaderboard-row" key={entry.id || entry._id || index}><span className="rank">{index + 1}</span><strong>{entry.user || entry.username || entry.name || 'Athlete'}</strong><span className="ms-auto points">{entry.points ?? entry.score ?? 0} pts</span></div>) : <p className="empty-state">No leaderboard entries found yet.</p>}</div></section>;
}

export default Leaderboard;