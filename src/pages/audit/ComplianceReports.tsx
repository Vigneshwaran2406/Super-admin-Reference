import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { FileSpreadsheet, Download, CheckCircle2, ShieldCheck } from 'lucide-react'

export const ComplianceReports: React.FC = () => {
  const reports = [
    { title: 'SOC 2 Type II Security & Confidentiality Audit Pack', standard: 'AICPA SOC 2', generated: '2026-09-01', size: '24.8 MB (PDF + Evidence Archive)', status: 'Certified Compliant' },
    { title: 'GDPR / CCPA Tenant Data Privacy & Deletion Audit', standard: 'GDPR / CCPA', generated: '2026-08-15', size: '8.4 MB (PDF)', status: 'Verified' },
    { title: 'ISO/IEC 27001:2022 Information Security Assessment', standard: 'ISO 27001', generated: '2026-07-30', size: '18.2 MB (PDF)', status: 'Certified Compliant' },
    { title: 'HIPAA Security Rule & BAA Tenant Compliance Audit', standard: 'HIPAA HITECH', generated: '2026-06-15', size: '12.5 MB (PDF)', status: 'Compliant' },
  ]

  return (
    <div>
      <ContextPanel
        title="Compliance & Regulatory Audit Reports"
        managedBy="SUPER ADMINISTRATOR (Global) • AUDIT & COMPLIANCE COMMITTEE"
        scope="GLOBAL"
        purpose="Provides downloadable regulatory readiness packages, third-party attestations, and periodic compliance summaries."
        accessLevel="ALL TENANTS (Full Regulatory Oversight)"
        educationalNotes="Compliance reports demonstrate that the platform enforces cryptographic tenant separation, audit immutability, and access control governance according to international standards."
        tags={['Compliance Reports', 'SOC 2', 'ISO 27001', 'GDPR']}
      />

      <div className="space-y-4 text-xs">
        {reports.map((r, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{r.title}</span>
                  <Badge variant="success" size="sm">{r.status}</Badge>
                </div>
                <div className="text-slate-400 text-xs">
                  Framework: <span className="text-indigo-300 font-semibold">{r.standard}</span> • Generated: {r.generated} • {r.size}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading mock report: ${r.title} (${r.standard})`)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Report Pack
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
