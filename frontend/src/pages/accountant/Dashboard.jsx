import React, { useEffect, useState } from 'react'
import api from '../../api/accountantApi'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.fetchDashboard().then(data => { if (mounted) { setSummary(data); setLoading(false) } }).catch(err => { console.error(err); setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-4 bg-white rounded shadow">Loading dashboard…</div>

  const kpis = summary?.kpis || { income: 0, expenses: 0, net: 0, pendingPayments: 0, overdue: 0 }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Total Income</div>
       