"use client";
import { ReactNode, useEffect } from "react";
import { TFlotaRead } from "@/schema/flota.schema";
import { useFlotaPrintStore } from "./flota-print.store";

export const FlotaPrintStoreProvider = ({
  children,
  flotas }: {
    children: ReactNode,
    flotas: TFlotaRead[],
  }) => {
  const { setFlotas } = useFlotaPrintStore();

  useEffect(() => {
    setFlotas(flotas)
  }, []);
  return <>{children}</>;
};