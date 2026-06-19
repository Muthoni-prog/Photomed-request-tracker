export default function Topbar({ darkMode, setDarkMode, setShowForm, filtered, activeNav }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--surface)',
      boxShadow: 'var(--shadow-sm)',
    }}>

      {/* LEFT — title */}
      <div style={{ fontSize: '14px', color: 'var(--soft)' }}>
        Showing{' '}
        <strong style={{ color: 'var(--text)', fontWeight: 600 }}>
          {activeNav === 'All' ? 'All Requests' : activeNav}
        </strong>
        {' '}— {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
      </div>

      {/* RIGHT — dark mode + button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            color: 'var(--soft)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'all .15s',
          }}
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* NEW REQUEST BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 20px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'opacity .15s',
          }}
          onMouseOver={e => e.target.style.opacity = '.85'}
          onMouseOut={e => e.target.style.opacity = '1'}
        >
          + New Request
        </button>
      </div>
    </div>
  )
}