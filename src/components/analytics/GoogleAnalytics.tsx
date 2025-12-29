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
          window.dataLayer = window.dataLayer || [];
          
          function gtag(){
            dataLayer.push(arguments);
          }
            
          gtag('js', new Date());
          gtag('config', 'AW-16773150848'); 
        `,
        }}
      />

      {/* Event snippet for Clic sortant conversion page In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. */}
      <Script
        async
        id="google-analytics-conversion"
        dangerouslySetInnerHTML={{
          __html: `
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
                  
            gtag('event', 'conversion', {
              'send_to': 'AW-16773150848/6VCGCJzv09gbEIDxh74-',
              'event_callback': callback
            });
                  
            return false;
          }
        `,
        }}
      />
    </>
  );
}
