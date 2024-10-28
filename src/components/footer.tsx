import Link from 'next/link';
import Button from './button';

const Footer = () => {
  return (
    <div className="w-full bg-black flex flex-col md:flex-row gap-12 md:gap-0 justify-center md:justify-between text-white items-center p-8 md:px-12 lg:px-24 md:py-12">
      <div className="text-center sm:px-12  md:text-start max-w-[600px]">
        <div className=" sm:text-lg pb-4">
          Nos équipes travaillent au lancement de Sowhat
          <span className="text-lg sm:text-2xl">®</span> avec l’objectif de la rendre disponible le
          plus vite possible.
        </div>

        <Link href="/legal" className="text-sm underline">
          Mentions légales
        </Link>
      </div>

      <Button title="Nous contacter" icon="greet" uri="/contact" />
    </div>
  );
};

export default Footer;
