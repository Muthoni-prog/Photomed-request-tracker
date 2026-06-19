export default function FilterBar({ filter, setFilter }) {

  const selStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '7px',
    padding: '12px 20px',
    fontSize: '13.5px',
    color: 'var(--text)',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    cursor: 'pointer',
  }

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      marginBottom: '20px',
    }}>

      {/* SEARCH */}
      <div style={{ flex: 1, position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--soft)',
          fontSize: '15px',
          pointerEvents: 'none',
        
        }}>
          ⌕
        </span>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={filter.search}
          onChange={e => setFilter({ ...filter, search: e.target.value })}
          style={{
            width: '100%',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '7px',
            padding: '12px 20px 12px 36px',
            fontSize: '13.5px',
            color: 'var(--text)',
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
          }}
        />
      </div>

      {/* PRIORITY FILTER */}
      <select
        style={selStyle}
        value={filter.priority}
        onChange={e => setFilter({ ...filter, priority: e.target.value })}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* TYPE FILTER */}
      <select
        style={selStyle}
        value={filter.type}
        onChange={e => setFilter({ ...filter, type: e.target.value })}
      >
        <option value="All">All Types</option>
        <option value="Bug">Bug</option>
        <option value="Feature Request">Feature Request</option>
        <option value="General Feedback">General Feedback</option>
        <option value="Partnership">Partnership</option>
        <option value="Other">Other</option>
      </select>

    </div>
  )
}