// Utile pour avoir le type de la fonction gtag_report_conversion dans le window global

export {};

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}
