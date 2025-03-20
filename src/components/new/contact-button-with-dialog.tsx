'use client';

import Link from 'next/link';
import { LinkedIn } from '@mui/icons-material';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '../../../components/ui/dialog';
import { AvatarDemo } from '../avatar-profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@radix-ui/themes';

const EMAIL = 'contact@sowhat-app.com';

export function ContactButtonWithDialog() {
  const { messages } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="3" variant="solid" className="bg-gray-200 text-gray-900 hover:bg-gray-200/85">
          {messages.header.contact}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{messages.contactDialog.title}</DialogTitle>
          <DialogDescription>{messages.contactDialog.description}</DialogDescription>
        </DialogHeader>
        <div className="gap-8 py-4 flex flex-col">
          <ProfileContactDialog
            person="raph"
            title="Co-founder & CEO"
            name="Raphaël METROP"
            link="rapha%C3%ABl-metrop-05714323"
          />

          <ProfileContactDialog
            person="hugo"
            title="Co-founder & CTO"
            name="Hugo BAYOUD"
            link="hugo-bayoud-4aa927194"
          />
        </div>

        <div className="flex flex-col items-center space-x-2">
          <div className="w-full h-0.5 bg-slate-100 rounded-sm" />
          <div className="grid flex-1 gap-2 p-8">{EMAIL}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ProfileContactDialogProps {
  person: 'raph' | 'hugo';
  name: string;
  title: string;
  link: string;
}

const ProfileContactDialog: React.FC<ProfileContactDialogProps> = ({
  person,
  name,
  title,
  link,
}) => {
  return (
    <div className="flex gap-4 items-center group">
      <AvatarDemo person={person} />

      <div className=" flex flex-col grow">
        <p className="text-lg font-bold">{name}</p>
        <p>{title}</p>
      </div>

      <Link href={`https://www.linkedin.com/in/${link}`} rel="noopener noreferrer" target="_blank">
        <LinkedIn fontSize="large" className=" hover:text-blue-600 transition-all duration-300" />
      </Link>
    </div>
  );
};
