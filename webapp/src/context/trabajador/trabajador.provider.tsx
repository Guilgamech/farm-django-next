"use client"
import { TTrabajador } from "@/schema/trabajador.schema";
import { ReactNode, useEffect } from "react";
import { useTrabajadorStore } from "./trabajador.store";

export const TrabajadorStoreProvider = ({ children, trabajadores }: { 
  children: ReactNode;
  trabajadores: TTrabajador[];
}) => {
  const { setTrabajadores, setFetchingTrabajadores } = useTrabajadorStore();

  useEffect(() => {
    setTrabajadores(trabajadores);
    setFetchingTrabajadores(false);
  }, [trabajadores, setTrabajadores, setFetchingTrabajadores]); // Added dependencies for useEffect

  return <>{children}</>;
};
