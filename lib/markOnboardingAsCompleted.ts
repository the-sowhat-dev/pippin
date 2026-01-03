'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function markOnboardingAsCompleted() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const client = await clerkClient();

  await client.users.updateUser(userId, {
    unsafeMetadata: {
      hasDoneTheOnboarding: true,
    },
  });

  return { success: true };
}
