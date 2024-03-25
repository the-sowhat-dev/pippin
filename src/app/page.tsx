import Image from "next/image";
import Footer from "./components/footer";
import Strategy from "./components/strategy";
import Button from "./components/button";
import StrategyCharts from './components/strategy-charts';

export default function Home() {
  return (
    <>
      <main
        className={`flex md:min-h-screen px-8 md:px-12 py-16 md:py-24 bg-gradient-to-b from-yellow-400 to-yellow-300 relative`}
      >
        <div className="flex flex-col w-full justify-between">
          <div>
            <div className="flex-none">
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                src="/font.svg"
                alt="Font Logo"
              />
            </div>
            <div className="w-full pt-12 text-lg sm:text-2xl lg:text-4xl text-center">
              Votre indépendance par l&apos;
              <span className="font-bold">Open Finance</span>.
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-24 pt-40">
            <Button />

            <div className="px-12 sm:px-0 my-11 max-w-[500px] w-full">
              <Image
                src="/mockup.png"
                alt="Strategy Image"
                width={500}
                height={0}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </main>

      <Strategy
        title={`Gestion, budget, épargne`}
        text={`Aujourd'hui, vous ne disposez pas des bonnes informations pour prendre les bonnes décisions !`}
        imagePath="/compass.png"
        canva="secondary"
      />

      <Strategy
        title={`Solution Sowhat`}
        text={`Anticipant l'émergence de l'Open Finance via la réglementation européenne DSP3, les équipes Sowhat ont développé une solution unique, ludique et innovante, qui révolutionne l'expérience`}
        secondText={`Elle souhaite révolutionner l'expérience de gestion et faciliter la prise de décision`}
        imagePath="/robot.png"
        canva="primary"
        brand={true}
      />

      <StrategyCharts
        title={`Testée et approuvée par une agence indépendante`}
        smallImagePath="/charts-small.png"
        largeImagePath="/charts-large.png"
        canva="dark"
      />

      <Strategy
        title={`Coming soon...`}
        text={`Nos équipes travaillent au lancement de Sowhat® avec l'objectif de la rendre disponible le plus vite possible.`}
        imagePath="/logo-blanc.png"
        canva="primary"
      />

      <Footer />
    </>
  );
}
