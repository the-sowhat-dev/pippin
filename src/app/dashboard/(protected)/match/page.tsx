export default async function Page() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Match</h1>
        <p className="text-gray-500 mt-2">Effectuez des matchs entre vous et les particuliers.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <span>Aucun match disponible</span>
      </div>
    </div>
  );
}
