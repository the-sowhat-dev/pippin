import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Link from 'next/link';
import { Instagram, LinkedIn, Facebook } from '@mui/icons-material';

export function NetworkButton({ type }: { type: 'facebook' | 'linkedin' | 'instagram' }) {
  if (type === 'facebook') {
    return (
      <div className="gap-3 flex flex-col items-center">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.facebook.com/share/9VV2yufSwGX31iXM'}
          className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom hover:bg-white transition-all duration-300 py-4 px-8 group"
        >
          <Facebook fontSize="large" />

          <span>sur Facebook</span>

          <ArrowForwardIcon
            fontSize="large"
            className="transform transition-transform group-hover:translate-x-2.5"
          />
        </Link>
      </div>
    );
  }

  if (type === 'instagram') {
    return (
      <div className="gap-3 flex flex-col items-center">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.instagram.com/sowhat_app_officiel/'}
          className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom hover:bg-white transition-all duration-300 py-4 px-8 group"
        >
          <Instagram fontSize="large" />

          <span>sur Instagram</span>

          <ArrowForwardIcon
            fontSize="large"
            className="transform transition-transform group-hover:translate-x-2.5"
          />
        </Link>
      </div>
    );
  }

  if (type === 'linkedin') {
    return (
      <div className="gap-3 flex flex-col items-center">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={'https://www.linkedin.com/company/sowhat-app/'}
          className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom hover:bg-white transition-all duration-300 py-4 px-8 group"
        >
          <LinkedIn fontSize="large" />

          <span>sur LinkedIn</span>

          <ArrowForwardIcon
            fontSize="large"
            className="transform transition-transform group-hover:translate-x-2.5"
          />
        </Link>
      </div>
    );
  }
}
