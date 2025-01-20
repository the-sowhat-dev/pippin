import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { YTButton } from './yt-button';

type CardProps = { description: string; title: string; link: string } & React.ComponentProps<
  typeof Card
>;

export function CardDemo({ className, title, description, link, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        'w-full aspect-video max-w-[400px] min-h-[200px] flex flex-col justify-between',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-pretty truncate font-opensans font-bold">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end">
        <YTButton link={link} />
      </CardFooter>
    </Card>
  );
}
