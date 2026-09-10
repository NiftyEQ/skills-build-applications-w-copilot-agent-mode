import { NavLink, BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : '';

export function apiUrl(component) {
  return `${apiOrigin}/api/${component}/`;
}

export async function fetchCollection(component, signal) {
  const response = await fetch(apiUrl(component), { signal });
  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`);
  }
  const payload = await response.json();
  return normalizeCollection(payload);
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

const links = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
];

function Overview() {
  return (
    <section className="hero-panel">
      <p className="eyebrow">Mergington High School</p>
      <h1>Move together. Go further.</h1>
      <p className="lead">Track progress, find your team, and keep every workout moving forward.</p>
      <div className="row g-3 mt-4">
        {links.slice(1).map(([path, label]) => (
          <div className="col-12 col-sm-6 col-lg-3" key={path}>
            <NavLink className="overview-link" to={path}>{label}<span aria-hidden="true">-&gt;</span></NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="container py-4">
          <nav className="navbar navbar-expand-lg px-0" aria-label="Primary navigation">
            <NavLink className="brand" to="/">OCTOFIT<span>/</span>TRACKER</NavLink>
            <div className="nav-links ms-auto">
              {links.map(([path, label]) => (
                <NavLink key={path} className="nav-link" to={path} end={path === '/'}>{label}</NavLink>
              ))}
            </div>
          </nav>
        </header>
        <main className="container pb-5">
          {!codespaceName && <div className="alert alert-warning border-0">API host is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code> before starting the frontend.</div>}
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;