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
        'mx-auto basis-1/3 sm:gap-4 max-w-[470px] flex flex-col justify-between',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end">
        <YTButton link={link} />
      </CardFooter>
    </Card>
  );
}
