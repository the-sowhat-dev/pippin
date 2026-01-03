export default async function Page() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alertes</h1>
        <p className="text-gray-500 mt-2">Gérez vos alertes.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <span>Aucune alerte disponible</span>
      </div>
    </div>
  );
}
