export default async function Page() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Alertes</h1>
        <p className="text-gray-500 mt-2">
          Enregistrez vos critères de recherche pour recevoir des alertes lorsque des profils qualifiés sont disponibles.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
          >
            {/* Header skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Content placeholder with requested text */}
            <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center p-4 text-center">
              <p className="text-gray-400 text-sm font-medium">Non disponible pour le moment.</p>
            </div>

            {/* Footer skeleton */}
            <div className="space-y-2 mt-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
}
