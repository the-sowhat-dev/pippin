interface Props {
  id: string;
  text: string;
  centered?: boolean;
}

export function Title({ id, text, centered = true }: Props) {
  return (
    <h2
      id={id}
      className={`font-opensans font-bold text-[#203649] text-2xl sm:text-4xl ${centered ? 'text-center' : ''} `}
    >
      {text}
    </h2>
  );
}
