import Image from 'next/image';
import Link from 'next/link';

const PressKitButton = () => {
  return (
    <Link
      href={
        'https://sowhat99-my.sharepoint.com/:f:/g/personal/hugo_bayoud_sowhat-app_com/EtRACoCC5M1NlaLgbXfdGhkB6po0755BznP4JILb4Z9Fyw'
      }
      className="flex justify-center items-center p-8 text-md sm:text-lg bg-transparent text-white gap-4"
    >
      <div className="flex">Kit presse</div>
      <Image
        width={24}
        height={24}
        style={{
          objectFit: 'contain',
          transform: 'rotate(-90deg)',
          filter: 'brightness(0) invert(1)',
        }}
        src="/icons/arrow-left.svg"
        alt="Back arrow left icon"
      />
    </Link>
  );
};

export default PressKitButton;
