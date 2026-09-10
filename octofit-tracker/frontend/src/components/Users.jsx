import { useEffect, useState } from 'react';
import { fetchCollection } from '../App';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { const controller = new AbortController(); fetchCollection('users', controller.signal).then(setUsers).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message); }); return () => controller.abort(); }, []);
  return <section className="content-panel"><p className="eyebrow">The community</p><h1>Users</h1><p className="text-secondary">Meet the students putting their goals into motion.</p>{error && <div className="alert alert-danger">{error}</div>}<div className="user-grid">{users.length ? users.map((user, index) => <article className="user-card" key={user.id || user._id || index}><span className="avatar">{(user.username || user.name || 'A').charAt(0).toUpperCase()}</span><h2>{user.username || user.name || 'Athlete'}</h2><p>{user.email || 'OctoFit member'}</p></article>) : <p className="empty-state">No users found yet.</p>}</div></section>;
}

export default Users;