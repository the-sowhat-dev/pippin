'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ProResponse, UpdateProInput, ProCertificationEnum } from 'sowhat-types';
import { updatePro, uploadImage } from '../../lib/api';
import { sanitizeText } from '@/utils/sanitize';
import { CertificationsChips } from './CertificationsChips';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export function UpdateProSheet({
  initialData,
  trigger,
}: {
  initialData: ProResponse | null;
  trigger: React.ReactNode;
}) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Ensure AMF is always included in initial certifications
  const initialCertifications = initialData?.certifications || [];
  if (!initialCertifications.includes(ProCertificationEnum.AMF)) {
    initialCertifications.push(ProCertificationEnum.AMF);
  }

  const [formData, setFormData] = useState<Partial<UpdateProInput>>({
    firstName: initialData?.firstName || user?.firstName || '',
    lastName: initialData?.lastName || user?.lastName || '',
    role: initialData?.role || '',
    presentation: initialData?.presentation || '',
    companyName: initialData?.companyName || '',
    sirenId: initialData?.sirenId || '',
    oriasId: initialData?.oriasId || '',
    companyDescription: initialData?.companyDescription || '',
    certifications: initialCertifications,
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [companyImageFile, setCompanyImageFile] = useState<File | null>(null);
  const [companyImagePreview, setCompanyImagePreview] = useState<string | null>(null);

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

      await user.reload();
      router.refresh();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de la mise à jour.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md w-full">
        <SheetHeader>
          <SheetTitle className="text-green-900">Modifier le profil</SheetTitle>
          <SheetDescription>
            Mettez à jour vos informations personnelles et professionnelles.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6 pb-20">
          <div className="space-y-4">
            <h3 className="font-semibold text-green-900 border-b pb-2">
              Informations personnelles
            </h3>

            <div className="flex flex-col gap-2">
              <Label htmlFor="profileImage">Photo de profil</Label>
              <div className="flex items-center gap-4">
                {(profileImagePreview || (user && user.imageUrl)) && (
                  <Image
                    src={!profileImagePreview ? user!.imageUrl! : profileImagePreview}
                    width={80}
                    height={80}
                    alt="Profile"
                    className="object-cover"
                  />
                )}
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageSelect}
                  className="cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input
                id="role"
                name="role"
                value={formData.role || ''}
                onChange={handleChange}
                required
                placeholder="Ex: Conseiller en gestion de patrimoine"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentation">Présentation</Label>
              <Textarea
                id="presentation"
                name="presentation"
                value={formData.presentation || ''}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Une courte présentation visible par les clients..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-900 border-b pb-2">Entreprise</h3>

            <div className="flex flex-col gap-2">
              <Label htmlFor="companyImage">Logo de l'entreprise</Label>
              <div className="flex items-center gap-4">
                {(companyImagePreview || (initialData && initialData.companyImage)) && (
                  <Image
                    width={80}
                    height={80}
                    src={!companyImagePreview ? initialData!.companyImage! : companyImagePreview}
                    alt="Company Logo"
                    className="object-cover"
                  />
                )}
                <Input
                  id="companyImage"
                  type="file"
                  accept="image/*"
                  onChange={handleCompanyImageSelect}
                  className="cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sirenId">SIREN</Label>
              <Input
                id="sirenId"
                name="sirenId"
                value={formData.sirenId || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="oriasId">ORIAS</Label>
              <Input
                id="oriasId"
                name="oriasId"
                value={formData.oriasId || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Certifications</Label>
              <CertificationsChips
                selectedCertifications={formData.certifications || []}
                onChange={(certifications: ProCertificationEnum[]) =>
                  setFormData((prev) => ({ ...prev, certifications }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Description de l'entreprise</Label>
              <Textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription || ''}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button className="bg-gray-100 hover:bg-gray-100/80 text-gray-900 gap-2 shadow-sm">
                Annuler
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-900 hover:bg-green-800 text-white gap-2 shadow-sm"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
