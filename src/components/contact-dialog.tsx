import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { ArrowForward, LinkedIn, WhatsApp } from '@mui/icons-material';

import { ContactButton } from './contact-button';
import { AvatarDemo } from './avatar-profile';

const EMAIL = 'contact@sowhat-app.com';

export function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ContactButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envie de discuter ?</DialogTitle>
          <DialogDescription>
            Nous contacter sur LinkedIn, WhatsApp ou bien par email.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-8 py-4 flex flex-col">
          <ProfileContactDialog
            person="raph"
            title="Co-founder & CEO"
            name="Raphaël METROP"
            link="rapha%C3%ABl-metrop-05714323"
            phone="33670028776"
          />

          <ProfileContactDialog
            person="hugo"
            title="Co-founder & CTO"
            name="Hugo BAYOUD"
            link="hugo-bayoud-4aa927194"
            phone="33698352892"
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
  phone: string;
}

const ProfileContactDialog: React.FC<ProfileContactDialogProps> = ({
  person,
  name,
  title,
  link,
  phone,
}) => {
  return (
    <div className="flex gap-4 items-center group">
      <AvatarDemo person={person} />

      <div className=" flex flex-col grow">
        <p className="text-lg font-bold">{name}</p>
        <p>{title}</p>
      </div>

      <Link href={`https://wa.me/${phone}`} rel="noopener noreferrer" target="_blank">
        <WhatsApp fontSize="large" className=" hover:text-green-600 transition-all duration-300" />
      </Link>

      <Link href={`https://www.linkedin.com/in/${link}`} rel="noopener noreferrer" target="_blank">
        <LinkedIn fontSize="large" className=" hover:text-blue-600 transition-all duration-300" />
      </Link>
    </div>
  );
};
