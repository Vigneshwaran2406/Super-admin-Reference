import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { 
  Server, 
  Activity, 
  Database, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Eye, 
  BellRing, 
  FileText, 
  Radio, 
  Play 
} from 'lucide-react'

interface ServiceItem {
  name: string
  region: string
  latency: string
  uptime: string
  status: 'Operational' | 'Degraded' | 'Maintenance'
}

export const MonitoringDashboard: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState<'health' | 'status' | 'errors'>('health')
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  const [services, setServices] = useState<ServiceItem[]>([
    { name: 'Multi-Tenant Auth & IAM Gateway', region: 'us-east-1', latency: '24ms', uptime: '99.99%', status: 'Operational' },
    { name: 'Core Microservices Orchestrator', region: 'us-east-1', latency: '42ms', uptime: '99.95%', status: 'Operational' },
    { name: 'PostgreSQL Relational Clusters', region: 'us-east-1 (Multi-AZ)', latency: '12ms', uptime: '99.99%', status: 'Operational' },
    { name: 'MongoDB Document Catalog Store', region: 'us-east-1', latency: '18ms', uptime: '99.98%', status: 'Operational' },
    { name: 'Kafka Audit & SIEM Event Stream', region: 'us-east-1', latency: '8ms', uptime: '100.0%', status: 'Operational' },
    { name: 'Elasticsearch Query & Log Analytics', region: 'us-east-1', latency: '68ms', uptime: '99.89%', status: 'Operational' },
  ])

  const handlePing = (s: ServiceItem) => {
    showToast(`Health ping dispatched: ${s.name}`, 'info', `Diagnostic response received in ${s.latency}.`)
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Infrastructure Health & Telemetry"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Live health monitoring of distributed cloud clusters, polyglot databases, and service-level latencies."
        accessLevel="PLATFORM ROOT INFRASTRUCTURE"
      />

      {/* Operational Actions Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'health'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> View Health
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Server className="w-3.5 h-3.5" /> View Status
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'errors'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> View Errors
          </button>
        </div>

        <button
          onClick={() => setIsAlertModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <BellRing className="w-3.5 h-3.5" /> Configure Alert
        </button>
      </div>

      {/* 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Overall Platform Health"
          value="99.98%"
          change="+0.02% 30d"
          trend="up"
          icon={<Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          description="Average cluster availability"
        />
        <StatCard
          title="Global Edge Latency"
          value="28 ms"
          change="-4 ms vs last week"
          trend="up"
          icon={<Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          description="p95 API response duration"
        />
        <StatCard
          title="Active Microservices"
          value="6 Services"
          change="All Operational"
          trend="neutral"
          icon={<Server className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          description="Healthy container clusters"
        />
        <StatCard
          title="Polyglot Persistence"
          value="Healthy"
          change="0 degraded nodes"
          trend="up"
          icon={<Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          description="RDBMS + NoSQL + SIEM"
        />
      </div>

      {/* Tab Specific Presentation */}
      {activeTab === 'health' && (
        <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">
                All Distributed Systems Fully Operational
              </div>
              <div className="text-[11px] text-slate-500">
                Zero infrastructure incidents detected across cloud availability zones.
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
            SLA MET: 99.98%
          </span>
        </div>
      )}

      {activeTab === 'errors' && (
        <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Low-Severity Telemetry Anomalies (Last 24 Hours)</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="py-2 flex justify-between">
              <span>Elasticsearch query latency spike on multi-facet search</span>
              <span className="font-mono text-slate-400">p99 = 142ms (Resolved)</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Tenant outbound webhook timeout (HTTP 504 on endpoint)</span>
              <span className="font-mono text-slate-400">Retried with backoff</span>
            </div>
          </div>
        </div>
      )}

      {/* Services Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Service Cluster Telemetry</h3>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Microservice / Data Store</th>
                <th className="py-3 px-4">Cloud Region</th>
                <th className="py-3 px-4">Ingress Latency</th>
                <th className="py-3 px-4">30-Day Uptime</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {services.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {s.region}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {s.latency}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                    {s.uptime}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> OPERATIONAL
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handlePing(s)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Ping
                      </button>
                      <ActionDropdown
                        items={[
                          {
                            label: 'Run Health Ping',
                            icon: <Radio className="w-3.5 h-3.5" />,
                            onClick: () => handlePing(s),
                          },
                          {
                            label: 'View Error Telemetry',
                            icon: <FileText className="w-3.5 h-3.5" />,
                            onClick: () => {
                              setSelectedService(s)
                            },
                          },
                          {
                            label: 'Configure Threshold',
                            icon: <BellRing className="w-3.5 h-3.5" />,
                            onClick: () => setIsAlertModalOpen(true),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configure Alert Modal */}
      <Modal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} title="Configure Alert Notification Threshold">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Latency SLA Threshold (ms)</label>
            <input
              type="number"
              defaultValue={100}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Alert Escalation Webhook</label>
            <input
              type="text"
              defaultValue="https://hooks.slack.com/services/corp/ops-alerts"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsAlertModalOpen(false)
                showToast('Alert threshold saved', 'success', 'Notification rule dispatched to telemetry engine.')
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Save Alert Rule
            </button>
          </div>
        </div>
      </Modal>

      {/* Error Telemetry Modal */}
      {selectedService && (
        <Modal isOpen={Boolean(selectedService)} onClose={() => setSelectedService(null)} title={`Telemetry: ${selectedService.name}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-1">
              <div>[TELEMETRY PROBE] Service: {selectedService.name}</div>
              <div>Ingress Latency: {selectedService.latency}</div>
              <div>Availability Uptime: {selectedService.uptime}</div>
              <div>HTTP 5xx Error Rate: 0.001% (Within nominal SLA bounds)</div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
