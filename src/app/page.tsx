import Link from 'next/link';
import Image from 'next/image';
import { mulish } from '../utils/fonts';

import Footer from '../components/footer';
import Button from '../components/button';
import NetworkLogo from '../components/network-logo';

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
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                src="/images/font.svg"
                alt="Font Logo"
              />
            </div>
            <div className="w-full pt-12 text-lg sm:text-2xl lg:text-4xl text-center">
              <span className="font-bold">
                L’application essentielle pour les finances personnelles
              </span>
              <div className="mt-4">propulsée par l’Open Finance, optimisée par l’IA</div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-24 pt-40">
            <Button title="Nous contacter" icon="greet" uri="/contact" />
          </div>
        </div>
      </main>

      <section
        className={`p-16 sm:p-24 min-h-[600px] bg-gradient-to-b from-yellow-100 to-yellow-50 flex flex-col gap-24`}
      >
        <div className="text-xl lg:text-2xl text-center px-0 lg:px-52">
          Vous aussi vous vous sentez seul(e) face à{' '}
          <span className="font-bold">votre épargne ?</span>
        </div>
        <div className="flex flex-col xl:flex-row gap-12 justify-between">
          <div className="flex-1 mb-10">
            <div className="flex w-full flex-col gap-8 justify-center items-center">
              <div
                className={`text-2xl sm:text-4xl ${mulish.className} text-yellow-500 text-center sm:px-12`}
              >
                Est-ce que je peux me permettre ?
              </div>
              <Image
                src={'/images/bubble-1-x.png'}
                alt="Strategy Image"
                className="animate-float"
                width={607}
                height={487}
                style={{ width: '100%', maxHeight: '380px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="flex-1 mb-10">
            <div className="flex w-full flex-col gap-8 justify-center items-center xl:mt-24">
              <div
                className={`text-2xl sm:text-4xl ${mulish.className} text-yellow-500 text-center sm:px-12`}
              >
                Je suis complètement perdu(e)...
              </div>
              <Image
                src={'/images/bubble-2-x.png'}
                alt="Strategy Image"
                className="animate-float2"
                width={607}
                height={568}
                style={{ width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="flex-1 mb-10">
            <div className="flex w-full flex-col gap-8 justify-center items-center">
              <div
                className={`text-2xl sm:text-4xl ${mulish.className} text-yellow-500 text-center sm:px-12`}
              >
                Oups !
              </div>
              <Image
                src={'/images/bubble-3-x.png'}
                alt="Strategy Image"
                className="animate-float"
                width={607}
                height={487}
                style={{ width: '100%', maxHeight: '380px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

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
        className={`min-h-[600px] bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col`}
      >
        <div className="flex flex-col xl:flex-row gap-24 justify-betwe==en">
          <div className="p-16 sm:p-24 items-center flex flex-col gap-12">
            <div className="items-center flex flex-col gap-3">
              <p className="text-blue-500 font-bold text-center text-2xl sm:text-4xl">
                Centralisation des données bancaires et patrimoniales
              </p>
              <p className="text-xl text-center">propulsée par l’Open Finance</p>
            </div>

            <Image
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
              src="/icons/arrow-down.svg"
              className="animate-floatarrow"
              alt="Back arrow down icon"
            />

            <div className="items-center flex flex-col gap-3">
              <p className="text-blue-500 font-bold text-center text-2xl sm:text-4xl">
                Personnalisation du budget et de l’épargne
              </p>
              <p className="text-xl text-center">algorithme propriétaire Sowhat</p>
            </div>

            <Image
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
              src="/icons/arrow-down.svg"
              className="animate-floatarrow"
              alt="Back arrow down icon"
            />

            <div className="items-center flex flex-col gap-3">
              <p className="text-blue-500 font-bold text-center text-2xl sm:text-4xl">
                Aide à la prise de décision financière
              </p>
              <p className="text-xl text-center">optimisée par l’IA</p>
            </div>
          </div>

          <div className="p-8 sm:p-16 flex justify-center visible xl:invisible">
            <span className="h-0.5 max-w-[500px] bg-yellow-200 rounded w-full" />
          </div>

          <div className="flex w-full flex-col gap-8 justify-between items-center">
            <div className="p-12 sm:p-24 sm:px-16 text-xl lg:text-2xl text-center">
              Sowhat, c’est
              <span className="font-bold">
                {` tous vos comptes bancaires et 100% de votre patrimoine `}
              </span>
              connectés dans une seule app, mais surtout c’est ce qu’il y a de plus facile et
              personnalisé pour gérer vos projets d’épargne, votre argent et votre budget : et c’est
              100% gratuit !
            </div>

            <div className="self-end">
              <Image
                src={'/images/fourmi-3d.png'}
                alt="Strategy Image"
                width={856}
                height={1072}
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  height: 'auto',
                  alignSelf: 'end',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`p-16 sm:p-24 min-h-[750px] bg-gradient-to-b from-gray-900 to-gray-700`}>
        <h1
          className={`${mulish.className} text-2xl sm:text-4xl text-center pb-12 lg:pb-32 text-white`}
        >
          Testée et approuvée par une agence indépendante... vous l’adorez !
        </h1>

        <div className="flex flex-col xl:flex-row gap-16">
          <div className="flex flex-1 justify-center items-center">
            <Image
              src={'/images/charts-large.png'}
              alt="Strategy Image"
              width={600}
              height={553}
              className="hidden xl:block"
              style={{
                width: '100%',
                maxHeight: '400px',
                maxWidth: '600px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />

            <Image
              src={'/images/charts-small.png'}
              alt="Strategy Image"
              width={1164}
              height={1957}
              className="block xl:hidden"
              style={{ width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      <section
        className={`min-h-[600px] bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col`}
      >
        <div className="flex grow flex-col xl:flex-row gap-16">
          <div className=" basis-1/2 p-8 sm:p-16 flex flex-col gap-12">
            <div
              className={`text-2xl sm:text-4xl w-full  ${mulish.className} text-blue-500 text-center sm:px-12`}
            >
              Suivez-nous !
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-between items-center grow ">
              <NetworkLogo
                src={'/images/linkedin_logo.png'}
                alt="Logo Linkedin"
                href={`https://www.linkedin.com/company/sowhat-app/`}
              />

              <NetworkLogo
                src={'/images/facebook_logo.png'}
                alt="Logo Facebook"
                href={`https://www.facebook.com/share/9VV2yufSwGX31iXM`}
              />

              <NetworkLogo
                src={'/images/instagram_logo.png'}
                alt="Logo Instagram"
                href={`https://www.instagram.com/sowhat_officiel`}
              />

              <NetworkLogo
                src={'/images/tiktok_logo.png'}
                alt="Logo Tiktok"
                href={`https://www.tiktok.com/@sowhat_app`}
              />
            </div>
          </div>

          <div className=" place-items-center basis-1/2">
            <Image
              className=""
              src={'/images/mockup-phone.png'}
              alt="Strategy Image"
              width={774}
              height={1070}
              style={{ width: '100%', maxHeight: '600px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
