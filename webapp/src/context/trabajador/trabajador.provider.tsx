"use client"
import { TTrabajador } from "@/schema/trabajador.schema";
import { ReactNode, useEffect } from "react";
import { useTrabajadorStore } from "./trabajador.store";
import { TRol } from "@/schema/rol.schema";
import { TArea } from "@/schema/area.schema";

export const TrabajadorStoreProvider = ({
   children, trabajadores 
  }: { 
  children: ReactNode;
  trabajadores: TTrabajador[];
  areas: TArea[];
  rols: TRol[];




}) => {
  const { setTrabajadores, setFetchingTrabajadores } = useTrabajadorStore();

  useEffect(() => {
    setTrabajadores(trabajadores);
    setFetchingTrabajadores(false);
  }, [trabajadores, setTrabajadores, setFetchingTrabajadores]); // Added dependencies for useEffect

  return <>{children}</>;
};
