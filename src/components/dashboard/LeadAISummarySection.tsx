import { LeadAiSummaryResponse } from "sowhat-types";
import { SectionTitle } from "./screening/SheetSectionTitle";
import { LexendFont } from "@/utils/fonts";

export const LeadAISummarySection = ({
  summary,
}: {
  summary: LeadAiSummaryResponse | null | undefined;
}) => {
  if (!summary || !summary.fullResponse) {
    return null;
  }

  const { fullResponse } = summary;

  return (
    <section>
      <SectionTitle>Rapport IA</SectionTitle>
      <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
        {fullResponse.message && (
          <div className="py-4">
            <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-1`}>Message</h4>
            <p className="text-sm text-gray-600">{fullResponse.message}</p>
          </div>
        )}

        {fullResponse.synthese && (
          <div className="py-4">
            <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}>Synthèse</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                <span className="block text-xs text-gray-500">Note</span>
                <span className="font-bold text-green-700">{fullResponse.synthese.note}/5</span>
              </div>
              <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                <span className="block text-xs text-gray-500">Optimisation</span>
                <span className="font-bold text-blue-700">
                  {fullResponse.synthese.optimisationLevel}%
                </span>
              </div>
              <div className="bg-gray-50 p-2 rounded h-full flex flex-col justify-center">
                <span className="block text-xs text-gray-500">Produit</span>
                <span
                  className="font-bold text-purple-700 text-xs break-words"
                  title={fullResponse.synthese.product}>
                  {fullResponse.synthese.product}
                </span>
              </div>
            </div>
          </div>
        )}

        {fullResponse.analyse && fullResponse.analyse.length > 0 && (
          <div className="py-4">
            <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}>Analyse</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {fullResponse.analyse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {fullResponse.recommandations && fullResponse.recommandations.length > 0 && (
          <div className="py-4">
            <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}>
              Recommandations
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {fullResponse.recommandations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {fullResponse.concretement && fullResponse.concretement.length > 0 && (
          <div className="py-4">
            <h4 className={`${LexendFont.className} text-green-900/70 text-sm mb-2`}>
              Concrètement
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {fullResponse.concretement.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
