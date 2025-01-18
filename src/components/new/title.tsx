interface Props {
  text: string;
}

export function Title({ text }: Props) {
  return <p className="font-opensans font-bold text-2xl sm:text-4xl text-center">{text}</p>;
}
