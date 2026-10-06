import { FILTERS } from "../filters";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ percent }) {
  return (
    <div className="ring">
      <svg viewBox="0 0 80 80">
        <circle className="ring-track" cx="40" cy="40" r={RADIUS} />
        <circle
          className="ring-fill"
          cx="40"
          cy="40"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
        />
      </svg>
      <span>{Math.round(percent)}%</span>
    </div>
  );
}

function Sidebar({ stats, filter, onFilter, onClearDone }) {
  const doneCount = stats.completed;
  const percent = stats.total ? (doneCount / stats.total) * 100 : 0;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <aside className="panel sidebar">
      <div className="brand">
        <img src="/logo.png" alt="Being Infinity logo" className="logo" />
        <div>
          <p className="brand-name">Being Infinity's</p>
          <h1>Todo App</h1>
        </div>
      </div>

      <div className="summary">
        <ProgressRing percent={percent} />
        <div>
          <p className="date">{today}</p>
          <p className="summary-text">
            {stats.total === 0
              ? "No tasks yet"
              : `${doneCount} of ${stats.total} tasks done`}
          </p>
        </div>
      </div>

      <nav className="filters">
        {Object.entries(FILTERS).map(([key, { label }]) => (
          <button
            key={key}
            className={filter === key ? "active" : ""}
            onClick={() => onFilter(key)}
          >
            {label}
            <span className="count">
              {key === "all" ? stats.total : key === "active" ? stats.active : stats.completed}
            </span>
          </button>
        ))}
      </nav>

      {doneCount > 0 && (
        <button className="clear-done" onClick={onClearDone}>
          Clear completed ({doneCount})
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
