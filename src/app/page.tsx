import Image from 'next/image';
import { mulish } from '../utils/fonts';

import Footer from '../components/footer';
import Button from '../components/button';
import PhotoComent from '../components/photo-coment';

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
              <span className="font-bold">L’avenir de la gestion du budget et de l’épargne</span>
              <div className="mt-4">propulsé par l’Open Finance, optimisé par l’IA</div>
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

      <section
        className={`p-16 sm:p-24 min-h-[600px] bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col`}
      >
        <div className="flex flex-col xl:flex-row gap-24 justify-between">
          <div className="flex w-full flex-col gap-8 justify-center items-center">
            <div className="text-xl lg:text-2xl text-center px-0 lg:px-20">
              Les équipes Sowhat ont développé{' '}
              <span className="font-bold">une solution Open Finance + IA</span> pour vous aider et
              vous rassurer…
            </div>
            <Image
              src={'/images/mockup-phones.png'}
              alt="Strategy Image"
              width={600}
              height={553}
              style={{ width: '100%', maxHeight: '500px', height: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="flex justify-center visible xl:invisible">
            <span className="h-0.5 max-w-[500px] bg-yellow-200 rounded w-full" />
          </div>

          <div className="items-center flex flex-col gap-12">
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

          <div className="flex justify-center visible xl:invisible">
            <span className="h-0.5 max-w-[500px] bg-gray-600 rounded w-full" />
          </div>

          <div className="flex flex-1 flex-col gap-12 justify-center mx-auto">
            <PhotoComent
              alt="Strategy Image"
              src={'/images/photo-2.png'}
              text={
                <span>
                  « Si on l’utilise, je pense qu’on devient <span className="font-bold">accro</span>{' '}
                  ! »*
                </span>
              }
            />

            <PhotoComent
              alt="Strategy Image"
              src={'/images/photo-1.png'}
              text={
                <span>
                  «{' '}
                  <span className="font-bold">
                    Quand je pense au temps que je perds sur mon fichier excel...
                  </span>{' '}
                  je pourrais payer 10 € par mois pour un outil comme ça ! »*
                </span>
              }
            />

            <div className="text-white text-xs">
              * : photos de profile fictives mais citations réelles
            </div>
          </div>
        </div>
      </section>

      <section
        className={`p-16 sm:p-24 pb-0 sm:pb-0 min-h-[600px] bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col`}
      >
        <div className="flex flex-col xl:flex-row gap-24 justify-between">
          <div className="items-center flex flex-col gap-24">
            <div className="text-xl lg:text-2xl text-center px-0 lg:px-20">
              Au niveau mondial, il existe une application qui a révolutionné chaque aspect
              important de notre vie
            </div>

            <div
              className={`text-2xl sm:text-4xl ${mulish.className} text-blue-500 text-center sm:px-12`}
            >
              Et pour votre argent ?
            </div>

            <Image
              src={'/images/logo-blanc.png'}
              alt="Strategy Image"
              width={1545}
              height={694}
              style={{ width: '100%', maxHeight: '150px', height: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="flex w-full flex-col gap-8 justify-end">
            <Image
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
