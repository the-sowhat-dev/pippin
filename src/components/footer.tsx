import Link from 'next/link';
import { ContactButton } from './contact-button';
import PressKitButton from './press-kit.button';
import { DialogCloseButton } from './contact-dialog';

const Footer = () => {
  return (
    <div className="w-full bg-black flex flex-col sm:flex-row gap-6 justify-center md:justify-between text-white items-center p-8 sm:px-12 lg:px-24 sm:py-12">
      <div className="sm:px-12 flex flex-col lg:flex-row lg:justify-between items-center flex-1">
        <Link href="/legal" className="text-sm underline">
          Mentions légales
        </Link>
        <PressKitButton />
      </div>

      <DialogCloseButton />
    </div>
  );
};

export default Footer;
