import { LexendFont } from "@/utils/fonts";

interface Props {
  id: string;
  text: string;
  centered?: boolean;
}

export function Title({ id, text, centered = true }: Props) {
  return (
    <h2
      id={id}
      className={`${LexendFont.className} text-[#203649] text-2xl sm:text-3xl ${centered ? "text-center" : ""} `}>
      {text}
    </h2>
  );
}
