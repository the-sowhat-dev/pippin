import { currentUser } from '@clerk/nextjs/server';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-500 mt-2">
          Gérez vos informations personnelles et préférences.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>{user?.firstName?.[0]}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-gray-500">Membre depuis {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'récemment'}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={16} /> Prénom
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {user?.firstName || 'Non renseigné'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={16} /> Nom
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {user?.lastName || 'Non renseigné'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail size={16} /> Email
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {user?.emailAddresses[0]?.emailAddress}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone size={16} /> Téléphone
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                Non renseigné
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
             <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors bg-blue-600">
                Modifier le profil
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

