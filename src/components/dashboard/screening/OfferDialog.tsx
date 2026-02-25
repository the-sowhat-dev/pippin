"use client";

import { useState, useEffect } from "react";
import { Info, Loader2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FullLeadResponse } from "sowhat-types";
import { Switch } from "@/components/ui/switch";

/** Patterns to detect forbidden content in offer messages */
const FORBIDDEN_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
  frenchPhone: /\b(\+33|0)[1-9](?:[\s.-]?\d){8}\b/,
  url: /(https?:\/\/|www\.)[^\s]+/i,
};

type ForbiddenContentType = "email" | "phone" | "url";

interface ForbiddenContentDetection {
  hasError: boolean;
  detectedTypes: ForbiddenContentType[];
}

function detectForbiddenContent(message: string): ForbiddenContentDetection {
  const detectedTypes: ForbiddenContentType[] = [];

  if (FORBIDDEN_PATTERNS.email.test(message)) {
    detectedTypes.push("email");
  }
  if (FORBIDDEN_PATTERNS.frenchPhone.test(message)) {
    detectedTypes.push("phone");
  }
  if (FORBIDDEN_PATTERNS.url.test(message)) {
    detectedTypes.push("url");
  }

  return {
    hasError: detectedTypes.length > 0,
    detectedTypes,
  };
}

function getForbiddenContentMessage(detectedTypes: ForbiddenContentType[]): React.ReactElement {
  const typeLabels: Record<ForbiddenContentType, string> = {
    email: "adresse email",
    phone: "numéro de téléphone",
    url: "URL",
  };

  if (detectedTypes.length === 0) return <></>;

  const boldTypes = detectedTypes.map((type, index) => {
    const label = typeLabels[type];
    const isLast = index === detectedTypes.length - 1;
    const isSecondToLast = index === detectedTypes.length - 2;

    return (
      <span key={type}>
        <strong>{label}</strong>
        {detectedTypes.length > 1 && !isLast && (isSecondToLast ? " et " : ", ")}
      </span>
    );
  });

  const plural = detectedTypes.length > 1;

  return (
    <>
      Il semble qu&apos;
      {plural ? "une ou plusieurs informations interdites ont" : "une information interdite a"} été
      {plural ? "s" : ""} ajoutée{plural ? "s" : ""} dans le message : {boldTypes}. Veuillez
      supprimer {plural ? "ces éléments" : "cet élément"} de votre message pour pouvoir l'envoyer.
    </>
  );
}

interface OfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: FullLeadResponse | undefined;
  offerMessage: string;
  onOfferMessageChange: (message: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function OfferDialog({
  open,
  onOpenChange,
  lead,
  offerMessage,
  onOfferMessageChange,
  onSubmit,
  isSubmitting,
}: OfferDialogProps) {
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [detectedTypes, setDetectedTypes] = useState<ForbiddenContentType[]>([]);

  useEffect(() => {
    if (!open) {
      setShowWarningAlert(false);
      setDetectedTypes([]);
    }
  }, [open]);

  const handleValidationClick = () => {
    const detection = detectForbiddenContent(offerMessage);
    if (detection.hasError) {
      setDetectedTypes(detection.detectedTypes);
      setShowWarningAlert(true);
    } else {
      onSubmit();
    }
  };

  const handleEditMessage = () => {
    setShowWarningAlert(false);
    setDetectedTypes([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{lead?.offer ? "Modifier l'offre" : "Faire une offre"}</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3">
              <p>
                Rédigez votre proposition commerciale pour ce prospect. Il recevra une notification.
              </p>
              <div className="flex gap-3 p-3 bg-gray-50 rounded-md border border-gray-100 items-start">
                <Info className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                <p className="text-sm text-gray-600">
                  En plus du message d'offre, le particulier aura accès à vos informations de profil
                  ainsi que les éléments de votre entreprise renseignés dans la section
                  &quot;Profil&quot;.
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="offer-message">Message</Label>
            <Textarea
              id="offer-message"
              placeholder="Bonjour, je vous propose..."
              value={offerMessage}
              onChange={(e) => onOfferMessageChange(e.target.value)}
              className={`min-h-[180px] resize-y ${showWarningAlert ? "border-amber-500 border-2 focus-visible:ring-amber-500" : ""}`}
              disabled={showWarningAlert}
            />
          </div>

          {/* Certification checkbox - always checked, not interactive */}
          <div className="flex gap-3 p-3 rounded-lg items-center">
            <Switch checked={true} disabled={true} className="data-[state=checked]:bg-green-500" />

            <p className="text-sm text-gray-700 leading-tight">
              Je certifie ne pas transmettre d&apos;adresse email, numéro de téléphone ou url vers
              un site externe à invstore. Ces informations pourront être transmises lors du match
              quand le particulier aura accepté la mise en relation.
            </p>
          </div>

          {/* Warning alert when forbidden content detected */}
          {showWarningAlert && (
            <div className="flex flex-col gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-900">
                  {getForbiddenContentMessage(detectedTypes)}
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleEditMessage}
                  disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Modifier mon message
                </Button>
              </div>
            </div>
          )}
        </div>

        {!showWarningAlert && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleValidationClick}
              disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {lead?.offer ? "Mettre à jour" : "Envoyer"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
