import { PoppinsFont } from "@/utils/fonts";
import { PressMentionsItems } from "../PressMentionsCarousel";
import { VideoStrategy } from "./VideoStrategy";
import QandAStrategy from "./QandAStrategy";

export const FooterStrategy = () => {
  return (
    <section className="bg-green-900">
      <div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden my-12 lg:my-24">
          <PressMentionsItems />
          <PressMentionsItems />
        </div>

        <VideoStrategy
          videoUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/app-demo.mp4"
          thumbnailUrl="https://abkqohkbpzpaafojdzqg.supabase.co/storage/v1/object/public/public-videos/video-thumbnail.jpg"
        />

        <div className="py-6 lg:py-12 max-w-6xl mx-auto">
          <h2
            className={`${PoppinsFont.className} px-6 text-4xl font-bold text-white lg:text-5xl lg:text-[50px] lg:row-start-1 max-w-[750px]`}>
            FAQ
          </h2>

          <QandAStrategy />
        </div>
      </div>
    </section>
  );
};
