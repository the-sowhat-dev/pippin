import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { OnboardingForm } from './OnboardingForm';
import { ProResponse } from 'sowhat-types';

interface EditProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: ProResponse | null;
  initialFirstName: string;
  initialLastName: string;
}

export function EditProfileSheet({
  isOpen,
  onOpenChange,
  initialData,
  initialFirstName,
  initialLastName,
}: EditProfileSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px] w-full overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-gray-900">
            Modifier mon profil
          </SheetTitle>
          <SheetDescription>
            Mettez à jour vos informations professionnelles et personnelles.
          </SheetDescription>
        </SheetHeader>
        <OnboardingForm
          initialFirstName={initialFirstName}
          initialLastName={initialLastName}
          initialData={initialData}
          isEditing={true}
          onSuccess={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

