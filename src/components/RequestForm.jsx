import { useState } from 'react'
import { supabase } from '../lib/supabase'

const initialState = {
  name: '',
  email: '',
  product: '',
  type: 'Bug',
  priority: 'Low',
  message: '',
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const labelStyle = {
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--soft)',
  letterSpacing: '.06em',
  textTransform: 'uppercase',
}

const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '7px',
  padding: '10px 12px',
  fontSize: '13.5px',
  color: 'var(--text)',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  width: '100%',
}

export default function RequestForm({ onClose, onSubmitted }) {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    // Basic validation
    if (!form.name || !form.email || !form.product || !form.message) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    setError('')

    const { error: sbError } = await supabase
      .from('requests')
      .insert([{ ...form, status: 'New' }])

    setLoading(false)

    if (sbError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess(true)
    onSubmitted()

    // Close panel after 1.5 seconds
    setTimeout(() => {
      setSuccess(false)
      setForm(initialState)
      onClose()
    }, 1500)
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#00000055',
          zIndex: 100,
        }}
      />

      {/* PANEL */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        height: '100vh',
        background: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '32px 28px',
        overflowY: 'auto',
        animation: 'slideIn .2s ease',
      }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 600 }}>New Request</div>
            <div style={{ fontSize: '13px', color: 'var(--soft)', marginTop: '3px' }}>
              Fill in the details below
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--border)',
              border: 'none',
              borderRadius: '6px',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* NAME + EMAIL */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              name="name"
              placeholder="full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              name="email"
              type="email"
              placeholder="eg:name@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PRODUCT */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Product / Company</label>
          <select
            style={inputStyle}
            name="product"
            value={form.product}
            onChange={handleChange}
          >
            <option value="">Select a product/company…</option>
            <option>MedScan</option>
            <option>PhotoMed</option>
            <option>Product1</option>
          </select>
        </div>

        {/* TYPE + PRIORITY */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Request Type</label>
            <select
              style={inputStyle}
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option>Bug</option>
              <option>Feature Request</option>
              <option>General Feedback</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Priority</label>
            <select
              style={inputStyle}
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* MESSAGE */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Message</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            name="message"
            placeholder="Describe your request in detail…"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div style={{
            fontSize: '13px',
            color: 'var(--red)',
            background: '#F05C5C12',
            padding: '10px 12px',
            borderRadius: '7px',
            border: '1px solid #F05C5C30',
          }}>
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div style={{
            fontSize: '13px',
            color: 'var(--green)',
            background: '#3DD68C12',
            padding: '10px 12px',
            borderRadius: '7px',
            border: '1px solid #3DD68C30',
          }}>
            ✓ Request submitted successfully!
          </div>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: 'auto',
            background: loading ? 'var(--muted)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '13px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity .15s',
            letterSpacing: '.02em',
          }}
        >
          {loading ? 'Submitting…' : 'Submit Request →'}
        </button>

      </div>

      {/* SLIDE IN ANIMATION */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: none; opacity: 1; }
        }
      `}</style>
    </>
  )
}