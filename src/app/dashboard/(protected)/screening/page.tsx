import { PageOnboardingConfig } from "@/utils/page-onboarding-config";
import { ProLeadsClient } from "@/components/dashboard/screening/ProLeadsClient";
import { HeaderWithPageOnboarding } from "@/components/dashboard/onboarding/HeaderWithPageOnboarding";

export default async function Page() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <HeaderWithPageOnboarding
        storageKey={PageOnboardingConfig.screening.key}
        title={PageOnboardingConfig.screening.title}
        subtitle={PageOnboardingConfig.screening.subtitle}
        short={PageOnboardingConfig.screening.short}
        full={PageOnboardingConfig.screening.full}
      />

      <ProLeadsClient />
    </div>
  );
}
