import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import YouTubeIcon from '@mui/icons-material/YouTube';

export function YTButton({ link }: { link: string }) {
  return (
    <div className="gap-3 flex flex-col items-center">
      <Link
        href={link}
        className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom hover:bg-red-300/10 transition-all duration-300 py-4 px-8 group"
      >
        <YouTubeIcon fontSize="large" color="warning" />

        <span className="block sm:hidden text-sm">Voir</span>
        <span className="hidden sm:block">Voir sur Youtube</span>

        <ArrowForwardIcon
          fontSize="large"
          color="warning"
          className="transform transition-transform group-hover:translate-x-2.5"
        />
      </Link>
    </div>
  );
}
