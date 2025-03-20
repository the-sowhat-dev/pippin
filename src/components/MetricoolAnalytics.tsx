'use client';

import Script from 'next/script';

export function MetricoolAnalytics() {
  return (
    <Script
      id="metricool"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          function loadScript(callback) {
            const head = document.getElementsByTagName('head')[0];
            const script = document.createElement('script');
            
            script.type = 'text/javascript';
            script.src = 'https://tracker.metricool.com/resources/be.js';
            script.onload = callback;
            script.onreadystatechange = callback;
            
            head.appendChild(script);
          }

          loadScript(function() {
            beTracker.t({
              hash: '4722ebb2d0bac377cd9be2740983fe3c'
            });
          });
        `,
      }}
    />
  );
}

/**
 * Keep this in case Cursor IA snippet is not working
 */
{
  /* <Script id="metricool" strategy="afterInteractive">
  {`
          function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"4722ebb2d0bac377cd9be2740983fe3c"})});
  `}
</Script>; */
}
