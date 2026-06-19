const navItems = [
  { label: 'All Requests', status: 'All',       color: '#6C63FF' },
  { label: 'New',          status: 'New',        color: '#4DA6FF' },
  { label: 'In Review',    status: 'In Review',  color: '#F5A623' },
  { label: 'Resolved',     status: 'Resolved',   color: '#3DD68C' },
  { label: 'Rejected',     status: 'Rejected',   color: '#F05C5C' },
]

export default function Sidebar({ activeNav, setActiveNav, requests }) {

  function getCount(status) {
    if (status === 'All') return requests.length
    return requests.filter(r => r.status === status).length
  }

  return (
    <aside style={{
      width: '220px',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '28px 0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      minHeight: '100vh',
    }}>

      {/* LOGO */}
      <div style={{
        padding: '0 20px 20px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '12px',
        fontFamily: 'DM Mono, monospace',
        fontSize: '18px',
        letterSpacing: '.08em',
        color: 'var(--accent)',
        fontWeight: 'bold',
      }}>
        PHOTOMED <span style={{ fontSize: '16px',color: 'var(--soft)' }}>TRACKER</span>
      </div>

      {/* NAV ITEMS */}
      {navItems.map(item => (
        <div
          key={item.status}
          onClick={() => setActiveNav(item.status)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: activeNav === item.status ? 'var(--text)' : 'var(--soft)',
            borderLeft: activeNav === item.status
              ? '2px solid var(--accent)'
              : '2px solid transparent',
            background: activeNav === item.status
              ? 'var(--accent-lo)'
              : 'transparent',
            transition: 'all .15s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: item.color,
              display: 'inline-block',
              flexShrink: 0,
            }} />
            {item.label}
          </div>
          <span style={{
            fontSize: '12px',
            fontFamily: 'DM Mono, monospace',
            color: 'var(--muted)',
          }}>
            {getCount(item.status)}
          </span>
        </div>
      ))}
    </aside>
  )
}