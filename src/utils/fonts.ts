import { Open_Sans, Source_Sans_3, Lexend, Roboto, Nunito, Poppins } from "next/font/google";

export const SourceSansPro = Source_Sans_3({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const OpenSans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const LexendFont = Lexend({ weight: ["600"], subsets: ["latin"] });

export const RobotoFont = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const PoppinsFont = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});
