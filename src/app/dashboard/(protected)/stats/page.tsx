import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function StatsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-500 mt-2">
          Vue d'ensemble de vos performances et métriques clés.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Visiteurs Uniques', value: '12,345', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Revenu Total', value: '45,230 €', change: '+8.2%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Taux de Conversion', value: '3.2%', change: '-0.4%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Session Moyenne', value: '4m 32s', change: '+24%', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Area Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Évolution Mensuelle</h3>
          <div className="flex items-end justify-between h-64 gap-2 px-4">
            {[40, 65, 45, 80, 55, 70, 40, 65, 45, 80, 55, 70].map((h, i) => (
              <div key={i} className="w-full bg-primary/10 hover:bg-primary/20 rounded-t-sm relative group bg-blue-100">
                <div 
                  className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-700"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
            <span>Juil</span><span>Août</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Répartition par Catégorie</h3>
          <div className="space-y-4">
            {[
              { label: 'Investissements', value: 45, color: 'bg-blue-600' },
              { label: 'Épargne', value: 30, color: 'bg-green-500' },
              { label: 'Dépenses Courantes', value: 15, color: 'bg-orange-400' },
              { label: 'Loisirs', value: 10, color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

