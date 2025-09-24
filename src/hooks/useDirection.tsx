"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface DirectionContextType {
  direction: string;
  toggleDirection: () => void;
}

export const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined
);

export const DirectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [direction, setDirection] = useState("ltr");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
    
    // Only access localStorage after hydration
    if (typeof window !== 'undefined') {
      const storedDirection = localStorage.getItem("direction");
      if (storedDirection && (storedDirection === "ltr" || storedDirection === "rtl")) {
        setDirection(storedDirection);
        document.documentElement.setAttribute("dir", storedDirection);
      } else {
        localStorage.setItem("direction", "ltr");
        document.documentElement.setAttribute("dir", "ltr");
      }
    }
  }, []);

  const toggleDirection = () => {
    if (!isHydrated) return; // Prevent action before hydration
    
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem("direction", newDirection);
      document.documentElement.setAttribute("dir", newDirection);
    }
  };

  const contextValue: DirectionContextType = {
    direction,
    toggleDirection,
  };

  return (
    <DirectionContext.Provider value={contextValue}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
};