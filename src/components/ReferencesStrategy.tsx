import Image from 'next/image';
import { Title } from './new/title';

const ReferencesStrategy = () => {
  return (
    <section className="flex flex-col gap-16 items-center p-8 py-12 sm:px-16 sm:py-24">
      <Title text={`Ils parlent de nous`} />

      <div className={`flex flex-col lg:flex-row gap-8 justify-center items-center w-full`}>
        <Reference
          title={`Sowhat : L'application pour gerer vos finances personnelles au quotidien`}
          description={`Deux jeunes lyonnais ont decideé de monter une entreprise dans la fintech, un domaine en pleine expansion`}
          image="/images/references/bfm_bg.webp"
          logo="/images/references/bfm_lyon.png"
          logoTitle="BFM TV Lyon"
        />
        <Reference
          title={`Sowhat : L'application pour gerer vos finances personnelles au quotidien`}
          description={`Deux jeunes lyonnais ont decideé de monter une entreprise dans la fintech, un domaine en pleine expansion`}
          image="/images/references/bfm_bg.webp"
          logo="/images/references/bfm_lyon.png"
          logoTitle="BFM TV Lyon"
        />
        <Reference
          title={`Sowhat : L'application pour gerer vos finances personnelles au quotidien`}
          description={`Deux jeunes lyonnais ont decideé de monter une entreprise dans la fintech, un domaine en pleine expansion`}
          image="/images/references/bfm_bg.webp"
          logo="/images/references/bfm_lyon.png"
          logoTitle="BFM TV Lyon"
        />
      </div>
    </section>
  );
};

interface Props {
  title: string;
  description: string;
  image: string;
  logo: string;
  logoTitle: string;
}

const Reference = ({ title, description, image, logo, logoTitle }: Props) => {
  return (
    <div className="rounded-lg border bg-white p-1 pb-0 max-w-[400px]">
      <div className="aspect-video bg-blue-600 rounded-t-md">
        <Image
          width={1920}
          height={1080}
          priority
          style={{ objectFit: 'contain' }}
          src={image}
          alt={logoTitle}
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-b-md">
        <p className="text-pretty line-clamp-2 font-bold">{title}</p>
        <p className="text-pretty line-clamp-2">{description}</p>
      </div>

      <div className="flex gap-4 items-center p-3">
        <Image
          width={150}
          height={150}
          priority
          style={{ width: 32, height: 32, objectFit: 'contain' }}
          src={logo}
          alt={logoTitle}
        />

        <p className="font-bold">{logoTitle}</p>
      </div>
    </div>
  );
};

export default ReferencesStrategy;
