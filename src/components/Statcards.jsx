export default function StatCards({ requests }) {
  const total      = requests.length
  const inReview   = requests.filter(r => r.status === 'In Review').length
  const resolved   = requests.filter(r => r.status === 'Resolved').length
  const highPrio   = requests.filter(r => r.priority === 'High').length

  const cards = [
    { label: 'Total Requests', value: total,    color: 'var(--accent)' },
    { label: 'In Review',      value: inReview, color: 'var(--amber)'  },
    { label: 'Resolved',       value: resolved, color: 'var(--green)'  },
    { label: 'High Priority',  value: highPrio, color: 'var(--red)'    },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '14px',
      marginBottom: '24px',
    }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            fontSize: '11px',
            color: 'var(--soft)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            fontWeight: 500,
          }}>
            {card.label}
          </div>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '30px',
            fontWeight: 500,
            color: card.color,
          }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}