import { ReactNode } from 'react';

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold text-green-900 border-b pb-2 mb-4 mt-8 first:mt-0">
    {children}
  </h3>
);
