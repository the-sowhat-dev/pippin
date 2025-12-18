import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AppleAppStoreLink = 'https://apps.apple.com/fr/app/sowhat-app/id6736385732';
export const AndroidAppStoreLink =
  'https://play.google.com/store/apps/details?id=com.thesowhatdev.fintech&pcampaignid=web_share';

export function getYesterdayDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export function formatDateFrench(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
