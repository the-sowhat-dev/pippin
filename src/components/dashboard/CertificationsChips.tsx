"use client";

import { ProCertificationEnum, ProCertifications, getProCertificationByKey } from "sowhat-types";
import { Switch } from "../ui/switch";

interface CertificationsChipsProps {
  selectedCertifications: ProCertificationEnum[];
  onChange: (certifications: ProCertificationEnum[]) => void;
}

export function CertificationsChips({
  selectedCertifications,
  onChange,
}: CertificationsChipsProps) {
  const handleToggle = (certification: ProCertificationEnum, checked: boolean) => {
    if (checked) {
      onChange([...selectedCertifications, certification]);
    } else {
      onChange(selectedCertifications.filter((c) => c !== certification));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {ProCertifications.map((certificationData) => {
        const certification = certificationData.key;
        const certificationInfo = getProCertificationByKey(certification);
        const isSelected = selectedCertifications.includes(certification);

        return (
          <div
            key={certification}
            title={certificationInfo?.description}
            className={`
              flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all
              ${
                isSelected
                  ? "bg-green-50 border-green-500 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }
            `}>
            <span className={`font-semibold ${isSelected ? "text-green-800" : "text-gray-600"}`}>
              {certificationInfo?.label || certification}
            </span>

            <Switch
              checked={isSelected}
              onCheckedChange={(checked) => handleToggle(certification, checked)}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        );
      })}
    </div>
  );
}
