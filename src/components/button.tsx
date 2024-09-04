import Image from 'next/image';
import Link from 'next/link';

type PrimaryButtonProps = {
  title: string;
  uri: string;
  icon: 'greet' | null;
};

const Button = (props: PrimaryButtonProps) => {
  const { title, uri, icon } = props;

  return (
    <Link
      href={uri}
      className="flex justify-center items-center min-h-[80px] min-w-[270px] text-md sm:text-lg whitespace-nowrap bg-blue-500 rounded-2xl shadow-custom text-white gap-2 contact-button hover:bg-sky-600 hover:text-white transition-all duration-500 hover:scale-105"
    >
      {icon && (
        <Image
          src={`/icons/${icon}.svg`}
          alt={`${icon} icon`}
          width={40}
          height={40}
          style={{ objectFit: 'contain' }}
          className="shake"
        />
      )}
      &nbsp;{title}
    </Link>
  );
};

export default Button;
