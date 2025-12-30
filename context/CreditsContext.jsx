"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CreditsContext = createContext(null);

export function CreditsProvider({ children }) {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);

  const reloadCredits = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/user/credits", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch credits");

      const data = await res.json();

      if (data?.authenticated) {
        setCredits(data.credits ?? 0);
      }
    } catch (error) {
      console.error("Failed to load credits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load once on mount
  useEffect(() => {
    reloadCredits();
  }, [reloadCredits]);

  const value = useMemo(
    () => ({
      credits,
      loading,
      reloadCredits,
      setCredits, // still exposed for instant UI updates
    }),
    [credits, loading, reloadCredits]
  );

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within CreditsProvider");
  }
  return context;
}
