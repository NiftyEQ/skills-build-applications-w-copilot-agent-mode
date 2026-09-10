import { useEffect, useState } from 'react';
import { fetchCollection } from '../App';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { const controller = new AbortController(); fetchCollection('teams', controller.signal).then(setTeams).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message); }); return () => controller.abort(); }, []);
  return <section className="content-panel"><p className="eyebrow">Find your crew</p><h1>Teams</h1><p className="text-secondary">Build a little accountability into every week.</p>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3 mt-3">{teams.length ? teams.map((team, index) => <article className="col-md-6" key={team.id || team._id || index}><div className="team-card"><span className="team-mark">{(team.name || 'T').charAt(0).toUpperCase()}</span><div><h2>{team.name || 'Unnamed team'}</h2><p>{team.members?.length ?? team.member_count ?? 0} members</p></div></div></article>) : <p className="empty-state">No teams found yet.</p>}</div></section>;
}

export default Teams;