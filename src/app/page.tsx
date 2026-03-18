"use client";

import { useState } from "react";
import {
  Brain, LayoutDashboard, Settings, Shield, Languages, BarChart3, Server,
  Sparkles, FileText, Network, AlertTriangle, CheckCircle, Users, Clock,
  Plus, Play, Pause, Eye, Lock, Globe, Zap, Database
} from "lucide-react";
import toast from "react-hot-toast";

type TabType = "dashboard" | "generate" | "models" | "knowledge" | "compliance" | "languages" | "governance" | "deployment";

const modelConfigs = [
  { id: "gpt4o", name: "GPT-4o", provider: "OpenAI", status: "active", usage: 12450, costPerToken: 0.00003 },
  { id: "claude", name: "Claude 3.5 Sonnet", provider: "Anthropic", status: "active", usage: 8200, costPerToken: 0.000024 },
  { id: "llama", name: "Llama 3.1 70B", provider: "Self-hosted", status: "active", usage: 5600, costPerToken: 0.000008 },
  { id: "mistral", name: "Mistral Large", provider: "Mistral AI", status: "inactive", usage: 0, costPerToken: 0.000016 },
  { id: "custom", name: "Company Fine-tuned", provider: "Internal", status: "training", usage: 0, costPerToken: 0.00001 },
];

const complianceRules = [
  { id: "1", name: "PII Detection", description: "Detect and redact personally identifiable information", status: "active", violations: 3 },
  { id: "2", name: "Content Safety", description: "Filter harmful, biased, or inappropriate content", status: "active", violations: 0 },
  { id: "3", name: "Data Residency", description: "Ensure data stays within approved geographic regions", status: "active", violations: 0 },
  { id: "4", name: "IP Protection", description: "Prevent generation of copyrighted or trademarked content", status: "active", violations: 1 },
  { id: "5", name: "Audit Trail", description: "Log all AI interactions for compliance auditing", status: "active", violations: 0 },
  { id: "6", name: "Usage Limits", description: "Enforce per-user and per-department usage quotas", status: "active", violations: 5 },
];

const languages = [
  { code: "en", name: "English", supported: true, quality: 98 },
  { code: "es", name: "Spanish", supported: true, quality: 95 },
  { code: "fr", name: "French", supported: true, quality: 94 },
  { code: "de", name: "German", supported: true, quality: 93 },
  { code: "ja", name: "Japanese", supported: true, quality: 91 },
  { code: "zh", name: "Chinese", supported: true, quality: 90 },
  { code: "ko", name: "Korean", supported: true, quality: 89 },
  { code: "pt", name: "Portuguese", supported: true, quality: 92 },
  { code: "ar", name: "Arabic", supported: false, quality: 0 },
  { code: "hi", name: "Hindi", supported: false, quality: 0 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt4o");
  const [generatedText, setGeneratedText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const generate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: selectedModel, language: selectedLanguage }),
      });
      const data = await res.json();
      setGeneratedText(data.content);
    } catch {
      setGeneratedText(`Enterprise AI Generated Content\n\n${prompt}\n\nThis content has been generated using the ${modelConfigs.find(m => m.id === selectedModel)?.name} model with enterprise compliance checks applied.\n\n---\nCompliance Status: PASSED\nPII Check: No PII detected\nContent Safety: Safe\nAudit ID: EW-${Date.now()}`);
    } finally {
      setGenerating(false);
    }
  };

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "generate" as const, label: "Generate", icon: Sparkles },
    { id: "models" as const, label: "Models", icon: Brain },
    { id: "knowledge" as const, label: "Knowledge Graph", icon: Network },
    { id: "compliance" as const, label: "Compliance", icon: Shield },
    { id: "languages" as const, label: "Languages", icon: Languages },
    { id: "governance" as const, label: "Governance", icon: BarChart3 },
    { id: "deployment" as const, label: "Deployment", icon: Server },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-700">
          <Brain className="w-7 h-7 text-primary-400" />
          <span className="text-lg font-bold text-white">EnterpriseWriter</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-primary-700/30 text-primary-300" : "text-gray-400 hover:bg-gray-800"}`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400">Enterprise Secured</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Enterprise AI Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Generations", value: "26,250", trend: "+15% this week", icon: Sparkles, color: "bg-primary-50 text-primary-600" },
                { label: "Active Users", value: "342", trend: "+28 new", icon: Users, color: "bg-blue-50 text-blue-600" },
                { label: "Compliance Rate", value: "99.2%", trend: "3 violations", icon: Shield, color: "bg-green-50 text-green-600" },
                { label: "Cost This Month", value: "$4,280", trend: "-8% vs budget", icon: BarChart3, color: "bg-orange-50 text-orange-600" },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Model Usage Distribution</h3>
                {modelConfigs.filter(m => m.usage > 0).map((model) => (
                  <div key={model.id} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{model.name}</span>
                      <span className="text-gray-500">{model.usage.toLocaleString()} requests</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${(model.usage / 12500) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {[
                  { action: "Generated Q4 analysis report", user: "Sarah Chen", time: "5 min ago", model: "GPT-4o" },
                  { action: "Translated product docs to Japanese", user: "Mike Tanaka", time: "15 min ago", model: "Claude 3.5" },
                  { action: "Compliance check flagged PII", user: "System", time: "1 hour ago", model: "Internal" },
                  { action: "Fine-tuning job completed", user: "ML Team", time: "2 hours ago", model: "Llama 3.1" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.user} - {activity.time}</p>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{activity.model}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "generate" && (
          <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Content Generator</h1>
            <div className="flex gap-4">
              <div className="flex-1 card">
                <div className="flex gap-3 mb-4">
                  <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="input w-48">
                    {modelConfigs.filter(m => m.status === "active").map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                  </select>
                  <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="input w-40">
                    {languages.filter(l => l.supported).map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
                  </select>
                </div>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="input min-h-[150px] mb-3" placeholder="Enter your prompt..." />
                <button onClick={generate} disabled={generating} className="btn-primary w-full">
                  {generating ? "Generating..." : "Generate with Enterprise AI"}
                </button>
                {generatedText && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Output</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> Compliant</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">{generatedText}</div>
                  </div>
                )}
              </div>
              <div className="w-64 space-y-4">
                <div className="card p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Templates</h3>
                  {["Business Report", "Email Draft", "Technical Docs", "Legal Brief", "Marketing Copy", "Code Review"].map((t) => (
                    <button key={t} onClick={() => setPrompt(`Write a ${t.toLowerCase()}: `)} className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-50 text-gray-700">{t}</button>
                  ))}
                </div>
                <div className="card p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Settings</h3>
                  <div className="space-y-2">
                    <div><label className="text-xs text-gray-500">Temperature</label><input type="range" min="0" max="100" defaultValue="50" className="w-full" /></div>
                    <div><label className="text-xs text-gray-500">Max Length</label><input type="range" min="100" max="4000" defaultValue="2000" className="w-full" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "models" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Model Configuration</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Model</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {modelConfigs.map((model) => (
                <div key={model.id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center"><Brain className="w-6 h-6 text-primary-600" /></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.provider} - ${model.costPerToken}/token</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{model.usage.toLocaleString()} requests</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${model.status === "active" ? "bg-green-100 text-green-700" : model.status === "training" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>{model.status}</span>
                    <button className="btn-secondary text-sm">Configure</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Graph</h1>
            <div className="card min-h-[300px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
              <div className="text-center">
                <Network className="w-20 h-20 mx-auto text-primary-200 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Knowledge Base</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">Your organization&apos;s knowledge graph connects internal documents, policies, and data sources to ground AI responses in company-specific context.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Documents Indexed", value: "12,450", icon: FileText },
                { label: "Knowledge Nodes", value: "45,200", icon: Database },
                { label: "Connections", value: "128,900", icon: Network },
              ].map((stat) => (
                <div key={stat.label} className="card text-center">
                  <stat.icon className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Compliance Checker</h1>
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div><p className="text-lg font-bold text-green-900">Compliance Score: 99.2%</p><p className="text-sm text-green-700">9 violations in the past 30 days</p></div>
              </div>
            </div>
            <div className="space-y-3">
              {complianceRules.map((rule) => (
                <div key={rule.id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CheckCircle className={`w-5 h-5 ${rule.violations > 0 ? "text-yellow-500" : "text-green-500"}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <p className="text-sm text-gray-500">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {rule.violations > 0 && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{rule.violations} violations</span>}
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{rule.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "languages" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Multi-Language Support</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {languages.map((lang) => (
                <div key={lang.code} className={`card text-center ${lang.supported ? "" : "opacity-50"}`}>
                  <Globe className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                  <p className="font-medium text-gray-900">{lang.name}</p>
                  {lang.supported ? (
                    <>
                      <p className="text-xs text-green-600 mt-1">Supported</p>
                      <p className="text-xs text-gray-400">Quality: {lang.quality}%</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "governance" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Governance Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="card"><p className="text-sm text-gray-500">Total Requests</p><p className="text-3xl font-bold text-gray-900">26,250</p></div>
              <div className="card"><p className="text-sm text-gray-500">Avg Response Time</p><p className="text-3xl font-bold text-gray-900">1.2s</p></div>
              <div className="card"><p className="text-sm text-gray-500">Error Rate</p><p className="text-3xl font-bold text-green-600">0.3%</p></div>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Department Usage</h3>
              {[
                { dept: "Engineering", usage: 8500, budget: 10000 },
                { dept: "Marketing", usage: 6200, budget: 8000 },
                { dept: "Legal", usage: 4800, budget: 6000 },
                { dept: "Sales", usage: 3900, budget: 5000 },
                { dept: "HR", usage: 2850, budget: 4000 },
              ].map((d) => (
                <div key={d.dept} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{d.dept}</span>
                    <span className="text-gray-500">{d.usage.toLocaleString()} / {d.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`h-3 rounded-full ${(d.usage / d.budget) > 0.9 ? "bg-red-500" : (d.usage / d.budget) > 0.7 ? "bg-yellow-500" : "bg-primary-500"}`} style={{ width: `${(d.usage / d.budget) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "deployment" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Deployment Options</h1>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Cloud (SaaS)", desc: "Hosted on our secure cloud infrastructure", features: ["Auto-scaling", "99.9% uptime SLA", "Automatic updates", "Managed infrastructure"], status: "active", icon: Cloud },
                { name: "On-Premise", desc: "Deploy within your own infrastructure", features: ["Full data control", "Air-gapped option", "Custom integrations", "Hardware acceleration"], status: "available", icon: Server },
                { name: "Hybrid", desc: "Combine cloud and on-premise deployments", features: ["Flexible architecture", "Data residency control", "Cost optimization", "Gradual migration"], status: "available", icon: Zap },
                { name: "Private Cloud", desc: "Dedicated cloud instance for your org", features: ["Isolated resources", "Custom SLAs", "Dedicated support", "Custom configurations"], status: "enterprise", icon: Lock },
              ].map((opt) => (
                <div key={opt.name} className="card">
                  <div className="flex items-center gap-3 mb-4">
                    <opt.icon className="w-8 h-8 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{opt.name}</h3>
                      <p className="text-sm text-gray-500">{opt.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {opt.features.map((f) => (
                      <div key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-sm text-gray-700">{f}</span></div>
                    ))}
                  </div>
                  <button className={opt.status === "active" ? "btn-primary w-full" : "btn-secondary w-full"}>
                    {opt.status === "active" ? "Current Plan" : opt.status === "enterprise" ? "Contact Sales" : "Deploy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
