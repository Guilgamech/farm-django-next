"use client"
import { TTratamiento, TTratamientoRead } from "@/schema/tratamiento.schema";
import { ReactNode, useEffect } from "react";
import { useTratamientoStore } from "./tratamiento.store";
import { TEnfermedad, TEnfermedadRead } from "@/schema/enfermedad.schema";
import { useEnfermedadStore } from "../enfermedad";

  export const TratamientoStoreProvider = ({ 
    children,
    tratamientos,
    enfermedades ,
     }: {
    children: ReactNode;
    tratamientos: TTratamientoRead[];
    enfermedades: TEnfermedadRead[];
}) => {
    const { setTratamientos, setFetchingTratamientos } = useTratamientoStore();
    const {setEnfermedades, setFetchingEnfermedades} = useEnfermedadStore();

    useEffect(() => {
        setTratamientos(tratamientos);
        setFetchingTratamientos(false);
        setEnfermedades(enfermedades)
        setFetchingEnfermedades(false)

    }, []);

    return <> {children} </>
};

