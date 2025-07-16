"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type QueryContextType = {
  query: string;
  setQuery: (val: string) => void;
};

const QueryContext = createContext<QueryContextType | null>(null);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("Ganric Image");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within QueryProvider");
  }
  return context;
};
