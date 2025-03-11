import { Title } from './new/title';

export default function VideoStrategy() {
  return (
    <section className="flex flex-col gap-16 py-8 sm:py-16 pt-12 m-4">
      <Title text="Les détails du projet Sowhat" />

      <Video link="https://www.youtube.com/embed/AJejzojumKI" />
    </section>
  );
}

function Video({ link }: { link: string }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-lg sm:text-2xl opacity-70 mt-3 text-center">{`Expliqué par Raphaël, cofondateur et CEO`}</p>
      <div className="sm:w-[800px] border-8 rounded-lg bg-yellow-500 border-yellow-500 items-center ">
        <iframe src={link} allowFullScreen className="rounded-lg aspect-video w-full" />
      </div>
    </div>
  );
}
