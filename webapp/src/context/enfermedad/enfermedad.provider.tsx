"use client"
import { TEnfermedad, TEnfermedadRead } from "@/schema/enfermedad.schema";
import { ReactNode, useEffect } from "react";
import { useEnfermedadStore } from "./enfermedad.store";
import { TTipoCultivo } from "@/schema/tipoc.schema";
import { useTipoCultivoStore } from "../tipoc";

  export const EnfermedadStoreProvider = ({ 
    children,
    enfermedades,
    tipocultivos ,
     }: {
    children: ReactNode;
    enfermedades: TEnfermedadRead[];
    tipocultivos: TTipoCultivo[],
}) => {
    const { setEnfermedades, setFetchingEnfermedades } = useEnfermedadStore();
    const {setTipoCultivos, setFetchingTipoCultivos} = useTipoCultivoStore();

    useEffect(() => {
        setEnfermedades(enfermedades);
        setFetchingEnfermedades(false);
        setTipoCultivos(tipocultivos)
        setFetchingTipoCultivos(false)

    }, []);

    return <> {children} </>
};

