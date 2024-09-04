import Button from './button';

const Footer = () => {
  return (
    <div className="w-full bg-black flex flex-col md:flex-row gap-12 md:gap-0 justify-center md:justify-between items-center p-6 md:px-12 lg:px-24 md:py-12">
      <div className="text-lg text-center sm:px-12 text-white md:text-start max-w-[600px]">
        Nos équipes travaillent au lancement de Sowhat<span className="text-2xl">®</span> avec
        l’objectif de la rendre disponible le plus vite possible.
      </div>
      <Button title="Nous contacter" icon="greet" uri="/contact" />
    </div>
  );
};

export default Footer;
