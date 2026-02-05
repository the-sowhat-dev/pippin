'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AndroidAppStoreLink, AppleAppStoreLink } from '@/utils/stores';

const DEEP_LINK_SCHEME = 'com.thesowhatdev.fintech';

type DeviceType = 'ios' | 'android' | 'desktop';

export default function AppRedirect() {
  const searchParams = useSearchParams();
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const destination = searchParams.get('to') || '';

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor;
    let detectedDevice: DeviceType = 'desktop';

    if (/android/i.test(userAgent)) {
      detectedDevice = 'android';
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      detectedDevice = 'ios';
    }

    setDeviceType(detectedDevice);

    // Mobile redirect logic
    if (detectedDevice !== 'desktop') {
      // Try to open the app
      const deepLink = `${DEEP_LINK_SCHEME}://${destination}`;
      const storeUrl = detectedDevice === 'ios' ? AppleAppStoreLink : AndroidAppStoreLink;

      // Attempt to open the app
      window.location.href = deepLink;

      // Start countdown
      let count = 3;
      const countdownInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      // Fallback to app store if app is not installed
      const fallbackTimer = setTimeout(() => {
        setIsRedirecting(false);
        window.location.href = storeUrl;
      }, 3000);

      // Cleanup: if app opens successfully, clear the fallback timer
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearTimeout(fallbackTimer);
          clearInterval(countdownInterval);
        }
      };

      const handleBlur = () => {
        clearTimeout(fallbackTimer);
        clearInterval(countdownInterval);
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('pagehide', handleBlur);

      return () => {
        clearTimeout(fallbackTimer);
        clearInterval(countdownInterval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('pagehide', handleBlur);
      };
    } else {
      setIsRedirecting(false);
    }
  }, [destination]);

  const handleManualRedirect = () => {
    if (deviceType === 'ios') {
      window.location.href = AppleAppStoreLink;
    } else if (deviceType === 'android') {
      window.location.href = AndroidAppStoreLink;
    }
  };

  const getStoreIcon = () => {
    if (deviceType === 'ios') {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      );
    } else if (deviceType === 'android') {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
        </svg>
      );
    }
    return null;
  };

  if (deviceType === 'desktop') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/40 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Application mobile requise</h1>
              <p className="text-muted-foreground text-lg">
                Ce lien est conçu pour s&apos;ouvrir dans notre application mobile
              </p>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="space-y-4 w-full">
              <p className="text-sm text-muted-foreground">
                Ouvrez ce lien sur votre mobile pour continuer, ou téléchargez notre application :
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={AppleAppStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="font-medium">App Store</span>
                </a>

                <a
                  href={AndroidAppStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
                  </svg>
                  <span className="font-medium">Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {isRedirecting ? (
            <>
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">{countdown}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Ouverture de l&apos;application</h1>
                <p className="text-muted-foreground">
                  Redirection vers l&apos;application dans {countdown} seconde{countdown !== 1 ? 's' : ''}...
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Tentative d&apos;ouverture de l&apos;application</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                {getStoreIcon()}
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Application pas encore installée ?</h1>
                <p className="text-muted-foreground">
                  Si l&apos;application n&apos;a pas ouvert automatiquement, vous pouvez la télécharger depuis le{' '}
                  {deviceType === 'ios' ? 'App Store' : 'Play Store'}
                </p>
              </div>

              <button
                onClick={handleManualRedirect}
                className="w-full bg-green-500 text-green-500-foreground px-8 py-4 rounded-lg hover:bg-green-500/90 transition-colors font-semibold text-lg shadow-lg"
              >
                Télécharger l&apos;application
              </button>

              <div className="pt-4 border-t border-border w-full">
                <p className="text-xs text-muted-foreground">
                  Vous avez déjà l&apos;application ?{' '}
                  <button
                    onClick={() => {
                      window.location.href = `${DEEP_LINK_SCHEME}://${destination}`;
                    }}
                    className="text-green-500 hover:underline font-medium"
                  >
                    Essayer à nouveau
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
