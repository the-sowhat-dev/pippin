import Image from 'next/image';
import Link from 'next/link';
import { mulish } from '../fonts';

interface ProfileImageProps {
  imagePath: string;
  imageAlt: string;
  title: string;
  text: string;
  link: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ imagePath, imageAlt, text, title, link }) => {
  return (
    <>
      <Link href={`https://www.linkedin.com/in/${link}`} rel="noopener noreferrer" target="_blank">
        <div className='text-center box-container group'>
          <h1 className={`${mulish.className} text-xl sm:text-3xl font-bold mb-8`}>{title}</h1 >
          <div className='bg-gray-300 rounded-full transition-colors duration-500 ease-in-out group-hover:bg-[#0077B7] mb-8'>
            <Image
              src={imagePath}
              alt={imageAlt}
              width={200}
              height={200}
              priority
            />
          </div>
          <button>
            <div className='ibe'>
              <div>{text}</div>
              <p className='text-box'><span><Image src="/linkedin.png" alt="Image" width={20} height={20} style={{ objectFit: 'contain' }} /></span>&nbsp;Linkedin</p>
            </div>
          </button>
        </div>
      </Link >
    </>
  )
}

export default ProfileImage;