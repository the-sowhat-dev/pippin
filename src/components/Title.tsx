interface Props {
  text: string;
  centered?: boolean;
}

export function Title({ text, centered = true }: Props) {
  return (
    <p
      className={`font-opensans font-bold text-[#203649] text-2xl sm:text-4xl ${centered ? 'text-center' : ''} `}
    >
      {text}
    </p>
  );
}
