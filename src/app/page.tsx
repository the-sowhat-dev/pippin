import Image from 'next/image';

import Footer from '../components/footer';
import { CTAButton } from '../components/cta-button';
import { NetworkButton } from '../components/rs-button';
import { CarouselDemo } from '../components/carousel-demo';

export default function Home() {
  return (
    <>
      <main
        className={`flex px-8 md:px-12 pt-16 md:pt-24 bg-gradient-to-b pb-32 md:pb-50 from-yellow-400 to-yellow-300 relative`}
      >
        <div className="flex flex-col w-full justify-between">
          <Image
            width={0}
            height={0}
            priority
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            src="/images/font.svg"
            alt="Font Logo"
          />
          <div className="w-full pt-12 text-lg sm:text-2xl lg:text-4xl text-center">
            <span>L’application essentielle pour les finances personnelles</span>
          </div>

          <div className="mt-16 md:mt-24 block xl:hidden">
            <CTAButton />
          </div>
        </div>
      </main>

      <div className="titles text-zinc-50">
        <div className="titles-slide">
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
        </div>

        <div className="titles-slide greenard">
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
          <p>Connectée</p>
          <p>Personnalisée</p>
          <p>Simple</p>
          <p>Sécurisée</p>
          <p>Française</p>
          <p>Cool</p>
          <p>Gratuite</p>
        </div>
      </div>

      <section
        className={`min-h-[600px] bg-gradient-to-b from-yellow-100 to-yellow-50 flex flex-col`}
      >
        <div className="p-8 pt-16 sm:p-12 sm:pt-32 flex w-full flex-col gap-8 items-center">
          <span className="text-2xl sm:text-4xl font-semibold text-center">{`Sowhat c’est`}</span>

          <div className="px-0 lg:px-64 text-xl lg:text-2xl text-center mb-8">
            tous vos comptes bancaires et 100% de votre patrimoine connectés dans une seule app.
          </div>

          <span className="text-2xl sm:text-4xl font-semibold text-center">{`Mais surtout`}</span>

          <div className="px-0 lg:px-64 text-xl lg:text-2xl text-center mb-8">
            c’est ce qu’il y a de plus facile et personnalisé pour gérer vos projets d’épargne,
            votre argent et votre budget.
          </div>

          <span className="text-2xl sm:text-4xl font-semibold text-center">{`100% gratuite !`}</span>
        </div>

        <div className="flex relative justify-end">
          <div className="hidden xl:flex xl:grow items-center justify-center absolute inset-0">
            <CTAButton />
          </div>

          <Image
            src={'/images/fourmi-3d.png'}
            alt="Strategy Image"
            style={{
              maxHeight: '500px',
              objectFit: 'contain',
            }}
            width={400}
            height={1000}
          />
        </div>
      </section>

      <CarouselDemo />

      <section
        className={`min-h-[600px] bg-gradient-to-b from-yellow-100 to-yellow-50 flex flex-col`}
      >
        <div className="py-16 px-8 sm:py-32 sm:px-16 sm:pt-32  gap-32 flex grow flex-col xl:flex-row">
          <div className="basis-1/2 flex flex-col gap-12 grow">
            <span className="text-2xl sm:text-4xl font-semibold text-center">
              Disponible en téléchargement !
            </span>

            <div className="flex grow items-center justify-center">
              <CTAButton />
            </div>
          </div>

          <div className="basis-1/2  flex flex-col gap-12 lg:px-64 xl:px-32">
            <span className="text-2xl sm:text-4xl font-semibold text-center">
              On reste connecté ?
            </span>

            <div className="flex grow items-center gap-8 justify-center flex-col">
              <NetworkButton type="facebook" />
              <NetworkButton type="instagram" />
              <NetworkButton type="linkedin" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
