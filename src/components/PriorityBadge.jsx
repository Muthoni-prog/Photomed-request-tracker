const styles = {
  'High':   '#F05C5C',
  'Medium': '#F5A623',
  'Low':    '#3DD68C',
}

export default function PriorityBadge({ priority }) {
  const color = styles[priority] || '#888899'

  return (
    <span style={{
      fontFamily: 'DM Mono, monospace',
      fontSize: '11.5px',
      fontWeight: 500,
      color: color,
      letterSpacing: '.04em',
    }}>
      {priority.toUpperCase()}
    </span>
  )
}