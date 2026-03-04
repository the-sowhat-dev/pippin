"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  storageKey: string;
  title: string;
  subtitle: string;
  short: string;
  full: string | null;
  action?: React.ReactNode;
}

export function HeaderWithPageOnboarding({
  storageKey,
  title,
  subtitle,
  short,
  full,
  action,
}: Props) {
  const [dismissed, setDismissed] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(storageKey);
    if (!seen) setDismissed(false);
  }, [storageKey]);

  function dismiss() {
    localStorage.setItem(storageKey, "true");
    setDismissed(true);
  }

  return (
    <>
      {/* Page header */}
      <header className="mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-2">{subtitle}</p>
          </div>

          {action && <div className="ml-auto">{action}</div>}

          {dismissed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setInfoOpen((v) => !v)}
              title="Afficher les informations"
              className="ml-auto mt-1 p-1.5 rounded-lg text-gray-400 hover:text-green-800 hover:bg-green-50 transition-colors flex-shrink-0">
              <Info size={20} />
            </motion.button>
          )}
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {(!dismissed || infoOpen) && (
          <motion.div
            key="overlay"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 pointer-events-none">
            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl pointer-events-auto overflow-hidden">
              {/* Header row */}
              <div className="flex items-center gap-2 px-5 pt-4 pb-3">
                <Info size={16} className="text-green-700 flex-shrink-0" />
                <p className="flex-1 text-sm text-gray-700 leading-snug">{short}</p>
              </div>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {expanded && full && (
                  <motion.div
                    key="full"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden">
                    <div className="px-5 pb-3 text-sm text-gray-600 whitespace-pre-wrap border-t border-gray-100 pt-3 leading-relaxed">
                      {full}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
                  {expanded && (
                    <>
                      <ChevronDown size={14} /> Réduire
                    </>
                  )}

                  {!expanded && full && (
                    <>
                      <ChevronUp size={14} /> En savoir plus
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (!dismissed) dismiss();
                    else setInfoOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 px-4 py-1.5 rounded-lg transition-colors">
                  C'est noté
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
