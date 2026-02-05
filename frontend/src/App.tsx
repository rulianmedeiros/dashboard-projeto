import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { LayoutDashboard, Users, Target, TrendingUp, ArrowDownRight, Globe } from 'lucide-react';
import axios from 'axios';

// Dados simulados para o gráfico enquanto o backend/n8n carrega
const dataSimulada = [
  { hora: '00h', leads: 40 }, { hora: '04h', leads: 15 },
  { hora: '08h', leads: 85 }, { hora: '12h', leads: 140 },
  { hora: '16h', leads: 110 }, { hora: '20h', leads: 190 },
  { hora: '23h', leads: 95 },
];

const App = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca dados reais do seu Backend que se comunica com o n8n
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://178.156.242.3:3001/api/leads', {
          params: { id: 15, campaign: 'lc14' } // Parâmetros do seu Postgres
        });
        setLeads(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados reais do n8n", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white p-8 font-['Inter',_sans-serif]">
      
      {/* HEADER PROFISSIONAL */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter flex items-center gap-2">
            <LayoutDashboard size={32} />
            Command <span className="text-white">Center.</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Análise de performance e mix de inteligência comercial.</p>
        </div>
        
        {/* Filtros de Período estilo referência */}
        <div className="flex gap-2 bg-[#0d1221] p-1 rounded-xl border border-slate-800">
          {['HOJE', '7 DIAS', '30 DIAS', 'TOTAL'].map((t) => (
            <button key={t} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${t === '30 DIAS' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE MÉTRICAS COM GLOW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'INVESTIMENTO (7D)', value: 'R$ 4.184,56', label: 'Meta Ads', icon: <TrendingUp size={16}/>, color: 'text-blue-400' },
          { title: 'TAXA DE RESPOSTA', value: '42%', label: '85 Respondentes', icon: <Target size={16}/>, color: 'text-indigo-400' },
          { title: 'LEADS QUALIFICADOS', value: '142', label: 'Aprovados IA', icon: <Users size={16}/>, color: 'text-emerald-400' },
          { title: 'CPL MÉDIO', value: 'R$ 4,12', icon: <ArrowDownRight size={16}/>, label: 'Saudável', color: 'text-blue-400' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d1221] border border-slate-800 p-6 rounded-2xl shadow-lg shadow-blue-500/5 hover:border-blue-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <p className={`text-[10px] font-bold ${item.color}`}>{item.title}</p>
              <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-blue-400 transition-colors">
                {item.icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{item.value}</h2>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-4 uppercase">
              <Globe size={12}/>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* GRÁFICO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0d1221] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Atividade de Vendas (Diário)
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSimulada}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hora" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1221', border: '1px solid #1e293b', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LISTA DE LEADS REAIS */}
        <div className="bg-[#0d1221] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-slate-400">Últimos Leads</h3>
          <div className="space-y-4">
            {loading ? (
              <p className="text-slate-500 text-xs animate-pulse">Carregando dados do n8n...</p>
            ) : (
              leads.slice(0, 6).map((lead: any, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                  <div>
                    <p className="text-xs font-bold">{lead.nome || 'Lead Anonimo'}</p>
                    <p className="text-[10px] text-slate-500">{lead.cidade || 'Brasil'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-blue-400">{lead.utm_source || 'Direto'}</p>
                    <p className="text-[10px] text-slate-600">{lead.hora_cadastro || '--:--'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;