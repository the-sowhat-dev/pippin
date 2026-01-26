export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "à l'instant";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `il y a ${diffInMonths} mois`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
}

/**
 * Calculate age from birth year
 */
export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};

/**
 * Calculate the number of days since inscription
 */
export const calculateDaysSinceInscription = (createdAt: Date | string): number => {
  const old = new Date(createdAt);
  const today = new Date();
  const daysAgo = Math.floor((today.getTime() - old.getTime()) / 1000 / 60 / 60 / 24);
  return daysAgo;
};

/**
 * Format inscription date as a human-readable string
 */
export const formatInscriptionDate = (createdAt: Date | string): string => {
  const daysAgo = calculateDaysSinceInscription(createdAt);
  return `Inscrit il y a ${daysAgo} jours`;
};

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
