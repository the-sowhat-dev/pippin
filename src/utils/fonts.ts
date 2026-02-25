import { Open_Sans, Source_Sans_3, Lexend, Roboto, Nunito } from "next/font/google";

export const SourceSansPro = Source_Sans_3({
  weight: ["400"],
  subsets: ["latin"],
});

export const OpenSans = Open_Sans({
  weight: ["700"],
  subsets: ["latin"],
});

export const LexendFont = Lexend({ weight: ["600"], subsets: ["latin"] });

export const RobotoFont = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const NunitoFont = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
});
