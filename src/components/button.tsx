import Link from 'next/link';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

type PrimaryButtonProps = {
  title: string;
  uri: string;
  icon: 'greet' | 'communique-de-presse' | null;
};

const Button = (props: PrimaryButtonProps) => {
  const { title, uri, icon } = props;

  return (
    <div className="gap-3 flex flex-col items-center">
      <Link
        href={uri}
        className="flex gap-3 justify-center items-center text-md sm:text-lg rounded-md shadow-custom text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 py-4 px-8 group"
      >
        <WavingHandOutlinedIcon
          fontSize="large"
          className="group-hover:animate-wave origin-bottom"
        />

        <span>{title}</span>
      </Link>
    </div>
  );
};

export default Button;
