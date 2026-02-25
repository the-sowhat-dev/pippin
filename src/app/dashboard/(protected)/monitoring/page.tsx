import { LexendFont } from "@/utils/fonts";

export default async function Page() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className={`${LexendFont.className} text-3xl font-bold text-green-900`}>Monitoring</h1>
        <h3 className="text-gray-500 mt-2 text-lg">Consulter vos performances</h3>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
            {/* Header skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Content placeholder with requested text */}
            <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center p-4 text-center">
              <p className="text-gray-400 text-sm font-medium">
                Aucun monitoring disponible pour le moment
              </p>
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
