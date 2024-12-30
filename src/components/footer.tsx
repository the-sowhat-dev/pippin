import Link from 'next/link';
import Button from './button';
import PressKitButton from './press-kit.button';

const Footer = () => {
  return (
    <div className="w-full bg-black flex flex-col sm:flex-row gap-6 justify-center md:justify-between text-white items-center p-8 sm:px-12 lg:px-24 sm:py-12">
      <div className="sm:px-12 flex flex-col lg:flex-row lg:justify-between items-center flex-1">
        <Link href="/legal" className="text-sm underline">
          Mentions légales
        </Link>
        <PressKitButton />
      </div>

      <Button title="Nous contacter" icon="greet" uri="/contact" />
    </div>
  );
};

export default Footer;
