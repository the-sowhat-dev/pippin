import { OpenSans } from '@/utils/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export const HeroPro = () => {
  return (
    <section className="py-12 pt-16 text-green-900 min-h-screen flex flex-col justify-between gap-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 pt-8 sm:pt-16">
        <h1
          className={`text-4xl sm:text-6xl leading-tight text-center w-[80%] mx-auto ${OpenSans.className}`}
        >
          Faire progresser l&apos;épargne par l&apos;expérience d&apos;achat
        </h1>
        <p className="text-center text-lg sm:text-2xl text-pretty w-[60%] mx-auto opacity-80">
          Vous distribuez des produits d&apos;épargne ? <br /> Obtenez de nouveaux clients !
        </p>
        <div className="flex justify-center">
          <Link href="/pro/form">
            <Button
              size="lg"
              className="text-md sm:text-lg px-8 py-6 rounded-lg bg-green-500 hover:bg-green-500/80"
            >
              Nous rejoindre
            </Button>
          </Link>
        </div>
      </div>

      <div className="items-center justify-center w-[70%] max-w-5xl mx-auto rounded-lg overflow-hidden xl:mt-12 border-2 border-gray-200 shadow-sm  md:shadow-lg rotate-1">
        <Image
          src={`/images/test.png`}
          alt={`@invstore`}
          width={1728}
          height={1117}
          className="w-full h-auto object-contain"
        />
      </div>

      <h3 className="w-[60%] mx-auto text-center leading-tight md:text-xl mt-8">
        Une source unique de prospects qualifiés grâce aux technologies IA et Open Banking, avec
        lesquels vous pouvez interagir directement dans la plateforme pour offrir vos produits et
        services.
      </h3>
    </section>
  );
};
