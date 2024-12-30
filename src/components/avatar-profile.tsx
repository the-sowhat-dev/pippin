import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarDemo({ person }: { person: 'raph' | 'hugo' }) {
  const initials = person.slice(0, 2).toUpperCase();

  return (
    <Avatar className="hover:bg-yellow-500 group-hover:bg-yellow-500 transition-all duration-300">
      <AvatarImage src={`/images/${person}.png`} alt={`@${person}`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
