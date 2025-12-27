'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16773150848" />
      <Script
        async
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16773150848'); 
        `,
        }}
      />
    </>
  );
}

{
  /* 
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17810065283"></script>
  <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-17810065283'); </script> */
}
