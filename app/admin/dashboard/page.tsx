"use client";

import { Users, BookOpen, Heart, MessageSquare, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/admin";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, 
  Cell, BarChart, Bar 
} from 'recharts';

export default function DashboardPage() {
  return (
    // Remplacement de p-6 par p-4 et suppression de toute restriction de largeur
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      
      {/* En-tête avec marges réduites */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500">Vue d'ensemble de l'activité</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-all shadow-sm">
            Exporter
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all">
            Nouvelle action
          </button>
        </div>
      </div>

      {/* Section KPIs - Largeur maximale utilisée */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Candidatures"
          value="1,234"
          icon={Users}
          iconColor="text-primary-600"
          bgColor="bg-primary-50"
          subtitle="+12% ce mois"
        />
        <KPICard
          title="Articles"
          value="567"
          icon={BookOpen}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
          subtitle="+3 nouveaux"
        />
        <KPICard
          title="Collectes"
          value="23"
          icon={Heart}
          iconColor="text-primary-600"
          bgColor="bg-primary-50"
          subtitle="Actives"
        />
        <KPICard
          title="Témoignages"
          value="89"
          icon={MessageSquare}
          iconColor="text-gray-600"
          bgColor="bg-gray-50"
          subtitle="À modérer"
        />
      </div>

      {/* Grid Principale - Élargie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Graphique principal */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Flux des candidatures</h3>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Temps réel</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{m:'Jan', v:45}, {m:'Fév', v:67}, {m:'Mar', v:89}, {m:'Avr', v:123}, {m:'Mai', v:156}, {m:'Jun', v:178}]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                <Line type="monotone" dataKey="v" stroke="#155EEF" strokeWidth={3} dot={{r: 4, fill: '#155EEF', strokeWidth: 0}} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition compacte */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 text-center lg:text-left">Répartition Projets</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{n:'E', v:75}, {n:'S', v:50}, {n:'C', v:25}]} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="v">
                  <Cell fill="#155EEF" /><Cell fill="#EAAA08" /><Cell fill="#525252" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <div className="text-[10px] text-gray-400 uppercase">Éduc.</div>
              <div className="text-sm font-bold text-primary-600">75%</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400 uppercase">Santé</div>
              <div className="text-sm font-bold text-yellow-600">50%</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400 uppercase">Climat</div>
              <div className="text-sm font-bold text-gray-600">25%</div>
            </div>
          </div>
        </div>

        {/* Liste Activité - Moins de padding */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm">Activité récente</h3>
            <button className="text-[11px] text-primary-600 font-bold uppercase tracking-wider">Tout voir</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { icon: Users, color: "text-primary-600", bg: "bg-primary-50", title: "Marie D.", desc: "Nouvelle candidature", time: "2h" },
              { icon: Heart, color: "text-primary-600", bg: "bg-primary-50", title: "Campagne X", desc: "Objectif 100% atteint", time: "6h" },
            ].map((item, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${item.bg} ${item.color}`}><item.icon size={16} /></div>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-gray-900">{item.title}</p>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions - Plus compact */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Priorités</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100 group cursor-pointer hover:bg-yellow-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
                <span className="text-xs font-bold text-yellow-900">47 Candidatures</span>
              </div>
              <TrendingUp size={14} className="text-yellow-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-100 cursor-pointer">
              <span className="text-xs font-bold text-primary-900">1 Brouillon article</span>
              <span className="text-[10px] font-bold text-primary-600">ÉDITER</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}