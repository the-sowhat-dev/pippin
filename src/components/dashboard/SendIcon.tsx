import { Send } from 'lucide-react';

export const SendIcon = () => {
  return (
    <div
      className="flex items-center gap-1 p-1.5 bg-blue-100 rounded-md"
      title="Offre envoyée au lead"
    >
      <Send className="w-4 h-4 text-blue-500 fill-blue-500" />
    </div>
  );
};
