import { useEffect, useState } from 'react';
import { fetchCollection } from '../App';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('activities', controller.signal).then(setActivities).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message);
    });
    return () => controller.abort();
  }, []);

  return <EntityTable title="Activity log" description="Recent movement across the OctoFit community." columns={['Activity', 'User', 'Duration', 'Points']} rows={activities} keys={['activity', 'user', 'duration', 'points']} error={error} />;
}

function EntityTable({ title, description, columns, rows, keys, error }) {
  return <section className="content-panel"><div className="d-flex justify-content-between align-items-end gap-3 mb-4"><div><p className="eyebrow">Live feed</p><h1>{title}</h1><p className="text-secondary mb-0">{description}</p></div><span className="count-badge">{rows.length} records</span></div>{error && <div className="alert alert-danger">{error}</div>}<div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={row.id || row._id || index}>{keys.map((key) => <td key={key}>{String(row[key] ?? '-')}</td>)}</tr>) : <tr><td className="empty-state" colSpan={columns.length}>{error ? 'No records available.' : 'No records found yet.'}</td></tr>}</tbody></table></div></section>;
}

export default Activities;