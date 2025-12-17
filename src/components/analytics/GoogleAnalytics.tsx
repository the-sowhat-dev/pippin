'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17810065283"
        strategy="afterInteractive"
      />
      <Script
        async
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-17810065283'); 
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
