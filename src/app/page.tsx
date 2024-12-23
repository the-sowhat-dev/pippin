import Image from 'next/image';
import { mulish } from '../utils/fonts';

import Footer from '../components/footer';
import NetworkLogo from '../components/network-logo';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main
        className={`flex px-8 md:px-12 pt-16 md:pt-24 bg-gradient-to-b pb-32 md:pb-64 from-yellow-400 to-yellow-300 relative`}
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

      {/* <section
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
      </section> */}

      <section
        className={`min-h-[600px] bg-gradient-to-b from-yellow-100 to-yellow-50 flex flex-col`}
      >
        {/* <div className="p-16 sm:p-24 items-center flex flex-col gap-12">
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
          </div> */}

        <div className="p-8 sm:p-16 pb-4 sm:pb-4 flex w-full flex-col gap-8 items-center">
          <div className={`text-2xl sm:text-4xl ${mulish.className} text-dark text-center`}>
            Sowhat c’est
          </div>
          <div className="px-0 lg:px-64 text-xl lg:text-2xl text-center mb-8">
            tous vos comptes bancaires et 100% de votre patrimoine connectés dans une seule app.
          </div>
          <div className={`text-2xl sm:text-4xl ${mulish.className} text-dark text-center`}>
            Mais surtout
          </div>
          <div className="px-0 lg:px-64 text-xl lg:text-2xl text-center mb-8">
            c’est ce qu’il y a de plus facile et personnalisé pour gérer vos projets d’épargne,
            votre argent et votre budget.
          </div>
          <div className={`text-2xl sm:text-4xl ${mulish.className} text-dark text-center`}>
            100% gratuite !
          </div>
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
          <div className=" basis-1/2 p-8 sm:p-16 flex flex-col gap-12 grow">
            <div
              className={`text-2xl sm:text-4xl w-full flex-1 ${mulish.className} text-blue-500 text-center sm:px-12`}
            >{`Téléchargez dès maintenant l'app`}</div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-center items-center grow">
              <Link
                href={'https://gogle.com'}
                className="flex justify-center items-center min-h-[80px] min-w-[270px] text-md sm:text-lg whitespace-nowrap bg-blue-500 rounded-2xl shadow-custom text-white gap-2 contact-button hover:bg-sky-600 hover:text-white transition-all duration-500 hover:scale-105"
              >
                Disponible sur iOS&nbsp;
                <Image
                  src={'/images/apple_logo.png'}
                  alt={'Apple logo'}
                  width={28}
                  height={28}
                  style={{ objectFit: 'contain', marginTop: -8 }}
                />
              </Link>
            </div>
          </div>

          <div className="basis-1/2 pb-8 sm:p-16 flex flex-col gap-12 lg:px-64 xl:px-32">
            <div
              className={`text-2xl sm:text-4xl w-full flex-1 ${mulish.className} text-blue-500 text-center sm:px-12`}
            >
              et suivez-nous !
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
                href={`https://www.instagram.com/sowhat_app_officiel/`}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
