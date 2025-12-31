import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">
          Bienvenue sur votre espace personnel, {user?.firstName}.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Activité Récente</h3>
          <p className="text-gray-500 text-sm">Aucune activité récente à afficher.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Vos Projets</h3>
          <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400">
            En cours de développement
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <p className="text-gray-500 text-sm">Vous êtes à jour.</p>
        </div>
      </div>
    </div>
  );
}
