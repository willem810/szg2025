import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface StyleContextType {
  isVintageStyle: boolean;
  toggleVintageStyle: () => void;
  setVintageStyle: (vintage: boolean) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

interface StyleProviderProps {
  children: ReactNode;
}

export const StyleProvider: React.FC<StyleProviderProps> = ({ children }) => {
  const [isVintageStyle, setIsVintageStyle] = useState(false);

  const toggleVintageStyle = () => {
    setIsVintageStyle(prev => !prev);
  };

  const setVintageStyle = (vintage: boolean) => {
    setIsVintageStyle(vintage);
  };

  return (
    <StyleContext.Provider value={{ isVintageStyle, toggleVintageStyle, setVintageStyle }}>
      {children}
    </StyleContext.Provider>
  );
}; 