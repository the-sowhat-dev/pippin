import { Heart } from 'lucide-react';

export const HeartIcon = () => {
  return (
    <div className="flex items-center gap-1 p-1.5 bg-green-100 rounded-md" title="Lead favori">
      <Heart className="w-4 h-4 text-green-400 fill-green-500" />
    </div>
  );
};
