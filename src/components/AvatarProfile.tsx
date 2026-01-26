import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function AvatarProfile({ person }: { person: 'raph' | 'hugo' }) {
  const initials = person.slice(0, 2).toUpperCase();

  return (
    <Avatar className="hover:bg-green-600 group-hover:bg-green-600 transition-all duration-300">
      <AvatarImage src={`/images/${person}.png`} alt={`@${person}`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
