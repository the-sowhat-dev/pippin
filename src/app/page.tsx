import Image from "next/image";
import Footer from './components/footer';
import Strategy from './components/strategy';

export default function Home() {
  return (
    <>
      <main className={`flex md:min-h-screen pt-12 md:pt-24 pb-24 md:pb-0 bg-gradient-to-b from-yellow-400 to-yellow-300`}>
        <div className='flex flex-col grow pt-16 px-12 md:p-24 w-full'>
          <div className='flex-none'>
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              src="/font.svg"
              alt="Font Logo"
            />
          </div>
          <div className="w-full pt-12 justify-center text-lg sm:text-2xl text-center flex-none">
            Votre indépendance par l'Open Finance.
          </div>
          <div className='flex grow justify-center items-center min-h-52'>
            <Image
              src="/ant.png"
              alt="Logo icon"
              width={120}
              height={120}
              priority
            />

          </div>
        </div>
      </main >
      <Strategy title={`Comptes, épargne, budget, investissements, patrimoine...
`} text={`Aujourd'hui, vous ne disposez pas des bonnes informations pour prendre les bonnes décisions !
`} imagePath='/compass.png' canva="secondary" />

      <Strategy title={`Solution Sowhat`} text={`Anticipant l'émergence de l'Open Finance via la réglementation européenne DSP3, les équipes Sowhat ont développé une solution unique, ludique et innovante, qui révolutionne l'expérience de gestion et facilite la prise de décision.`} imagePath='/robot.png' canva="primary" brand={true} />

      <Strategy title={`Testée et approuvée par une agence indépendante.`} text={`"enfin la bonne information pour la bonne décision... instantanément !"`} imagePath='/mockups.png' canva="secondary" />

      <Strategy title={`Coming soon...`} text={`Nos équipes travaillent au lancement de Sowhat® avec l'objectif de la rendre disponible le plus vite possible.`} imagePath='/floating-macbook.png' canva="primary" />

      <Footer />
    </>
  );
}
