'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ProResponse, UpdateProInput, ProCertificationEnum } from 'sowhat-types';
import { updatePro, uploadImage } from '../../lib/api';
import { markOnboardingAsCompleted } from '../../utils/markOnboardingAsCompleted';
import { LexendFont } from '@/utils/fonts';
import { sanitizeText } from '@/utils/sanitize';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { CertificationsChips } from './CertificationsChips';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function OnboardingForm({
  initialFirstName,
  initialLastName,
  initialData,
}: {
  initialFirstName: string;
  initialLastName: string;
  initialData: ProResponse | null;
}) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [companyImageFile, setCompanyImageFile] = useState<File | null>(null);
  const [companyImagePreview, setCompanyImagePreview] = useState<string | null>(null);

  // Ensure AMF is always included in initial certifications
  const initialCertifications = initialData?.certifications || [];
  if (!initialCertifications.includes(ProCertificationEnum.AMF)) {
    initialCertifications.push(ProCertificationEnum.AMF);
  }

  const [formData, setFormData] = useState<Partial<UpdateProInput>>({
    firstName: initialData?.firstName || initialFirstName,
    lastName: initialData?.lastName || initialLastName,
    role: initialData?.role || '',
    presentation: initialData?.presentation || '',
    companyName: initialData?.companyName || '',
    sirenId: initialData?.sirenId || '',
    oriasId: initialData?.oriasId || '',
    companyDescription: initialData?.companyDescription || '',
    certifications: initialCertifications,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Image trop volumineuse. La taille maximum est de 2MB.');
        return;
      }
      setProfileImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setProfileImagePreview(objectUrl);
    }
  };

  const handleCompanyImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Image trop volumineuse. La taille maximum est de 2MB.');
        return;
      }
      setCompanyImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setCompanyImagePreview(objectUrl);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const token = await getToken();

      // Ensure AMF is always included in certifications
      const certifications = formData.certifications || [];
      if (!certifications.includes(ProCertificationEnum.AMF)) {
        certifications.push(ProCertificationEnum.AMF);
      }

      const payload: UpdateProInput = {
        clerkId: user.id,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        role: formData.role || null,
        presentation: sanitizeText(formData.presentation) || null,
        companyName: formData.companyName || null,
        companyDescription: sanitizeText(formData.companyDescription) || null,
        sirenId: formData.sirenId || null,
        oriasId: formData.oriasId || null,
        certifications,
      };

      await updatePro(payload, token);

      if (profileImageFile) {
        await uploadImage(profileImageFile, 'clerk', token);
      }

      if (companyImageFile) {
        await uploadImage(companyImageFile, 'company', token);
      }

      await markOnboardingAsCompleted();
      await user.reload();
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={handleNext} className="space-y-6 flex flex-col gap-8">
        <div className={`text-xl font-bold text-green-700 ${LexendFont.className}`}>
          Informations personnelles
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-center gap-4">
          <div>
            <label className="block font-medium text-gray-700">Photo de profil</label>
            <p className="text-xs text-gray-500 mb-2">
              Vous pourrez modifier la photo de profil dans les paramètres.
              <br />
              Ratio recommandé 1:1, jusqu&apos;à 2MB
            </p>
          </div>

          <div className="mt-2 flex items-center space-x-4">
            {(profileImagePreview || (user && user.imageUrl)) && (
              <Image
                width={80}
                height={80}
                src={!profileImagePreview ? user!.imageUrl : profileImagePreview}
                alt="Profile"
                className="rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageSelect}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-500 hover:file:bg-green-500/20 text-green-500 p-2  rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={formData.firstName || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              value={formData.lastName || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block font-medium text-gray-700">
            Rôle dans l'entreprise
          </label>
          <input
            type="text"
            name="role"
            id="role"
            required
            placeholder="Commercial, Head of Growth, Conseiller, etc."
            value={formData.role || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="presentation" className="block font-medium text-gray-700">
            Une phrase pour vous présenter (sera visible par les particuliers)
          </label>
          <textarea
            name="presentation"
            id="presentation"
            required
            rows={3}
            value={formData.presentation || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Certifications</label>
          <CertificationsChips
            selectedCertifications={formData.certifications || []}
            onChange={(certifications: ProCertificationEnum[]) =>
              setFormData((prev) => ({ ...prev, certifications }))
            }
          />
        </div>

        <button
          type="submit"
          className="w-full text-white font-bold p-4 bg-green-500 hover:bg-green-500/80 rounded-md cursor-pointer"
        >
          Suivant : Informations de l'entreprise
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-8">
      <div className={`text-xl font-bold text-green-700 ${LexendFont.className}`}>
        Informations de l'entreprise
      </div>

      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <label className="block font-medium text-gray-700">
            Logo de l'entreprise (Optionnel)
          </label>

          <p className="text-xs text-gray-500 mb-2">
            Vous pourrez modifier le logo de l'entreprise dans les paramètres.
            <br />
            Ratio recommandé 1:1, jusqu&apos;à 2MB
          </p>
        </div>
        {(companyImagePreview || (initialData && initialData.companyImage)) && (
          <Image
            width={80}
            height={80}
            src={!companyImagePreview ? initialData!.companyImage! : companyImagePreview}
            alt="Company Logo"
            className="object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCompanyImageSelect}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-500 hover:file:bg-green-500/20 text-green-500 p-2  rounded-md cursor-pointerd"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block font-medium text-gray-700">
          Nom de l'entreprise
        </label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          required
          value={formData.companyName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="sirenId" className="block font-medium text-gray-700">
          Numéro de SIREN
        </label>
        <input
          type="text"
          name="sirenId"
          id="sirenId"
          required
          placeholder="Numéro SIREN de l'entreprise"
          value={formData.sirenId || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="oriasId" className="block font-medium text-gray-700">
          Numéro ORIAS
        </label>
        <input
          type="text"
          name="oriasId"
          id="oriasId"
          required
          placeholder="Numéro ORIAS de l'entreprise"
          value={formData.oriasId || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="companyDescription" className="block font-medium text-gray-700">
          Description de l'entreprise
        </label>
        <textarea
          name="companyDescription"
          id="companyDescription"
          required
          rows={3}
          value={formData.companyDescription || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full text-green-500 p-2 bg-green-500/10 rounded-md cursor-pointer"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white font-bold p-4 bg-green-500 hover:bg-green-500/80 rounded-md cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            'Compléter la configuration'
          )}
        </button>
      </div>
    </form>
  );
}
