import { supabase } from '../lib/supabase'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'

const thStyle = {
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--soft)',
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  background: 'var(--bg)',
}

const tdStyle = {
  padding: '14px 16px',
  fontSize: '13.5px',
  borderBottom: '1px solid var(--border)',
  verticalAlign: 'middle',
}

const statusOptions = ['New', 'In Review', 'Resolved', 'Rejected']

export default function RequestTable({ requests, onStatusChange }) {

  async function handleStatusChange(id, newStatus) {
    const { error } = await supabase
      .from('requests')
      .update({ status: newStatus })
      .eq('id', id)
    if (!error) onStatusChange()
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  if (requests.length === 0) {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '60px',
        textAlign: 'center',
        color: 'var(--soft)',
        fontSize: '14px',
      }}>
        No requests found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr
              key={r.id}
              style={{ background: i % 2 === 0 ? 'transparent' : '#00000003' }}
            >
              {/* # */}
              <td style={tdStyle}>
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '12px',
                  color: 'var(--soft)',
                }}>
                  #{String(r.id).padStart(4, '0')}
                </span>
              </td>

              {/* NAME */}
              <td style={tdStyle}>
                <div style={{ fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--soft)' }}>{r.email}</div>
              </td>

              {/* TYPE */}
              <td style={tdStyle}>
                <span style={{
                  fontSize: '11.5px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--border)',
                  color: 'var(--soft)',
                  fontFamily: 'DM Mono, monospace',
                }}>
                  {r.type}
                </span>
              </td>

              {/* PRIORITY */}
              <td style={tdStyle}>
                <PriorityBadge priority={r.priority} />
              </td>

              {/* PRODUCT */}
              <td style={{ ...tdStyle, color: 'var(--soft)', fontSize: '13px' }}>
                {r.product}
              </td>

              {/* STATUS DROPDOWN */}
              <td style={tdStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StatusBadge status={r.status} />
                  <select
                    value={r.status}
                    onChange={e => handleStatusChange(r.id, e.target.value)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '5px',
                      padding: '3px 6px',
                      fontSize: '11px',
                      color: 'var(--soft)',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </td>

              {/* SUBMISSION DATE */}
              <td style={{
                ...tdStyle,
                color: 'var(--soft)',
                fontSize: '12px',
                fontFamily: 'DM Mono, monospace',
              }}>
                {formatDate(r.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}