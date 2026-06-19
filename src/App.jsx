import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatCards from './components/StatCards'
import FilterBar from './components/FilterBar'
import RequestTable from './components/RequestTable'
import RequestForm from './components/RequestForm'

export default function App() {
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState({ status: 'All', priority: 'All', type: 'All', search: '' })
  const [showForm, setShowForm] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeNav, setActiveNav] = useState('All')

  // Apply dark mode to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Fetch all requests from Supabase
  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRequests(data)
  }

  // Filter logic
  const filtered = requests.filter(r => {
    const matchStatus   = activeNav === 'All' || r.status === activeNav
    const matchPriority = filter.priority === 'All' || r.priority === filter.priority
    const matchType     = filter.type === 'All' || r.type === filter.type
    const matchSearch   = r.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                          r.email.toLowerCase().includes(filter.search.toLowerCase()) ||
                          r.message.toLowerCase().includes(filter.search.toLowerCase())
    return matchStatus && matchPriority && matchType && matchSearch
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} requests={requests} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setShowForm={setShowForm}
          filtered={filtered}
          activeNav={activeNav}
        />

        <div style={{ padding: '28px', flex: 1, overflowY: 'auto' }}>
          <StatCards requests={requests} />
          <FilterBar filter={filter} setFilter={setFilter} />
          <RequestTable
            requests={filtered}
            onStatusChange={fetchRequests}
          />
        </div>
      </div>

      {showForm && (
        <RequestForm
          onClose={() => setShowForm(false)}
          onSubmitted={fetchRequests}
        />
      )}
    </div>
  )
}