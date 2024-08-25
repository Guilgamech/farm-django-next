"use client"
import { TAgricola, TAgricolaRead } from "@/schema/agricola.schema";
import { ReactNode, useEffect } from "react";
import { useAgricolaStore } from "./agricola.store";
import { TArea } from "@/schema/area.schema";
import { useAreaStore } from "../area";

  export const AgricolaStoreProvider = ({ 
    children,
    agricolas,
    areas ,
     }: {
    children: ReactNode;
    agricolas: TAgricolaRead[];
    areas: TArea[],
}) => {
    const { setAgricolas, setFetchingAgricolas } = useAgricolaStore();
    const {setAreas, setFetchingAreas} = useAreaStore();

    useEffect(() => {
        setAgricolas(agricolas);
        setFetchingAgricolas(false);
        setAreas(areas)
        setFetchingAreas(false)

    }, []);

    return <> {children} </>
};

