'use client';

import {
  ProCertificationEnum,
  ProCertifications,
  getProCertificationByKey,
} from 'sowhat-types';
// import * as Switch from '@radix-ui/react-switch';
import { Switch } from '../ui/switch';

interface CertificationsChipsProps {
  selectedCertifications: ProCertificationEnum[];
  onChange: (certifications: ProCertificationEnum[]) => void;
}

export function CertificationsChips({
  selectedCertifications,
  onChange,
}: CertificationsChipsProps) {
  const handleToggle = (certification: ProCertificationEnum, checked: boolean) => {
    // AMF is always required and cannot be disabled
    if (certification === ProCertificationEnum.AMF) return;

    if (checked) {
      onChange([...selectedCertifications, certification]);
    } else {
      onChange(selectedCertifications.filter((c) => c !== certification));
    }
  };

  return (<Switch id="airplane-mode" defaultChecked />)

  return (
    <div className="flex flex-col gap-3">
      <Switch defaultChecked />
      {ProCertifications.map((certificationData) => {
        const certification = certificationData.key;
        const certificationInfo = getProCertificationByKey(certification);
        const isAMF = certification === ProCertificationEnum.AMF;
        const isSelected = isAMF || selectedCertifications.includes(certification);

        return (
          <div
            key={certification}
            title={isAMF ? 'AMF est obligatoire' : certificationInfo?.description}
            className={`
              flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all
              ${isSelected
                ? 'bg-green-50 border-green-500 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex flex-col">
              <span
                className={`font-semibold ${isSelected ? 'text-green-800' : 'text-gray-600'}`}
              >
                {certificationInfo?.label || certification}
                {isAMF && (
                  <span className="ml-2 text-xs font-normal text-green-600">(obligatoire)</span>
                )}
              </span>
              <span className={`text-xs ${isSelected ? 'text-green-600' : 'text-gray-400'}`}>
                {certificationInfo?.description}
              </span>
            </div>

            {/* <Switch.Root
              checked={isSelected}
              onCheckedChange={(checked) => handleToggle(certification, checked)}
              disabled={isAMF}
              className={`
                relative w-11 h-6 rounded-full transition-colors
                ${isAMF ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected ? 'bg-green-500' : 'bg-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              `}
            >
              <Switch.Thumb
                className={`
                  block w-5 h-5 bg-white rounded-full shadow-md transition-transform
                  ${isSelected ? 'translate-x-5' : 'translate-x-0.5'}
                `}
              />
            </Switch.Root> */}

          </div>
        );
      })}
    </div>
  );
}
