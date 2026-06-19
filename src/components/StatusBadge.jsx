const styles = {
  'New':       { bg: '#4DA6FF18', color: '#4DA6FF' },
  'In Review': { bg: '#F5A62318', color: '#F5A623' },
  'Resolved':  { bg: '#3DD68C18', color: '#3DD68C' },
  'Rejected':  { bg: '#F05C5C18', color: '#F05C5C' },
}

export default function StatusBadge({ status }) {
  const s = styles[status] || { bg: '#88889918', color: '#888899' }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '11.5px',
      fontWeight: 500,
      padding: '4px 10px',
      borderRadius: '20px',
      background: s.bg,
      color: s.color,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: s.color,
        display: 'inline-block',
      }} />
      {status}
    </span>
  )
}