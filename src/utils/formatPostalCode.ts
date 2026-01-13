export function formatPostalCode(postalCode: string | null | undefined): string {
  if (!postalCode) return '--';

  if (postalCode === 'LIVES_OUTSIDE_FRANCE') return 'Ne réside pas en France';

  return postalCode;
}
