import { Suspense } from "react";

import { PageOnboardingConfig } from "@/utils/page-onboarding-config";
import { AlertsClient } from "@/components/dashboard/alerts/AlertsClient";
import { AlertsSkeleton } from "@/components/dashboard/alerts/AlertsSkeleton";
import { NotificationEmailHandler } from "@/components/dashboard/alerts/NotificationEmailHandler";
import { NotificationEmailSkeleton } from "@/components/dashboard/alerts/NotificationEmailSkeleton";
import { HeaderWithPageOnboarding } from "@/components/dashboard/onboarding/HeaderWithPageOnboarding";

export default function Page() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <HeaderWithPageOnboarding
        storageKey={PageOnboardingConfig.alerts.key}
        title={PageOnboardingConfig.alerts.title}
        subtitle={PageOnboardingConfig.alerts.subtitle}
        short={PageOnboardingConfig.alerts.short}
        full={PageOnboardingConfig.alerts.full}
      />

      <div className="space-y-8">
        <Suspense fallback={<NotificationEmailSkeleton />}>
          <NotificationEmailHandler />
        </Suspense>

        <Suspense fallback={<AlertsSkeleton />}>
          <AlertsClient />
        </Suspense>
      </div>
    </div>
  );
}
