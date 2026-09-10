import { useEffect, useState } from 'react';
import { fetchCollection } from '../App';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { const controller = new AbortController(); fetchCollection('workouts', controller.signal).then(setWorkouts).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message); }); return () => controller.abort(); }, []);
  return <section className="content-panel"><p className="eyebrow">Personalized suggestions</p><h1>Workouts</h1><p className="text-secondary">A starting point for your next strong session.</p>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3 mt-3">{workouts.length ? workouts.map((workout, index) => <article className="col-md-6 col-lg-4" key={workout.id || workout._id || index}><div className="workout-card"><span className="workout-type">{workout.type || 'Workout'}</span><h2>{workout.name || workout.title || 'Training session'}</h2><p>{workout.description || 'Make time for movement today.'}</p><span className="duration">{workout.duration || '-'} min</span></div></article>) : <p className="empty-state">No workouts found yet.</p>}</div></section>;
}

export default Workouts;