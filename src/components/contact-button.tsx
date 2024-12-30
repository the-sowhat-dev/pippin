import { WavingHandOutlined } from '@mui/icons-material';

export const ContactButton = () => {
  return (
    <div className="py-4 px-8 w-fit flex gap-4 items-center text-md text-lg rounded-md text-black bg-yellow-400 hover:bg-yellow-400/90 transition-all duration-300 group">
      <WavingHandOutlined fontSize="large" className="group-hover:animate-wave origin-bottom" />

      <span>{`Nous contacter`}</span>
    </div>
  );
};
