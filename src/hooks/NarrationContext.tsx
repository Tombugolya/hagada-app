import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNarration } from './useNarration';

type NarrationValue = ReturnType<typeof useNarration>;

const NarrationContext = createContext<NarrationValue | null>(null);

export function NarrationProvider({ children }: { children: ReactNode }) {
  const narration = useNarration();
  return (
    <NarrationContext.Provider value={narration}>
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarrationContext(): NarrationValue {
  const ctx = useContext(NarrationContext);
  if (!ctx) throw new Error('useNarrationContext must be used within NarrationProvider');
  return ctx;
}
