"use client";
import React, { createContext, useContext, useState } from "react";

type ModaleContextType = {
  activeModal: string | null;
  modaleOpen: boolean;
  modaleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  modaleShow: (_id: string, _data?: any) => void;
  editData: any | null | boolean;
};

const ModaleContext = createContext<ModaleContextType | null>(null);

export const ModaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editData, setEditData] = useState<any | null>(false);

  const modaleClose = () => {
    setEditData(false);
    setActiveModal(null);
  };

  const modaleShow = (id: string, data?: any) => {
    if (data) setEditData(data);
    setActiveModal(id); // only one modal will be active
  };

  const value: ModaleContextType = {
    activeModal,
    modaleOpen: activeModal !== null,
    modaleClose,
    modaleShow,
    editData,
  };

  return (
    <ModaleContext.Provider value={value}>{children}</ModaleContext.Provider>
  );
};

export const useModale = (): ModaleContextType => {
  const context = useContext(ModaleContext);
  if (!context) {
    throw new Error("useModale must be used within a ModaleProvider");
  }
  return context;
};
