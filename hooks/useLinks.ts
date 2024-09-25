import React, { useContext, createContext } from 'react';
import { LinksOut } from '@/models/Dashboard/LinksOut';

// Create a context type that holds both `links` and `setLinks`
export interface LinksContextType {
  links: LinksOut[];
  setLinks: React.Dispatch<React.SetStateAction<LinksOut[]>>;
}

// Initialize the context
export const LinksContext = createContext<LinksContextType | undefined>(undefined);

// Custom hook to access the `LinksContext`
export const useLinks = () => {
  const context = useContext(LinksContext);
  
  // Throw an error if the hook is used outside the `LinksContext.Provider`
  if (!context) {
    throw new Error('useLinks must be used within a LinksContext.Provider');
  }

  return context; // Return `links` and `setLinks`
};
