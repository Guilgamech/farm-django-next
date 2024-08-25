"use client"
import { TOficina, TOficinaRead } from "@/schema/oficina.schema";
import { ReactNode, useEffect } from "react";
import { useOficinaStore } from "./oficina.store";
import { TArea } from "@/schema/area.schema";
import { useAreaStore } from "../area";
import { TRol } from "@/schema/rol.schema";
import { useRolStore } from "../rol";

  export const OficinaStoreProvider = ({ 
    children,
    oficinas,
    areas,
    rols,
     }: {
    children: ReactNode;
    oficinas: TOficinaRead[];
    areas: TArea[],
    rols: TRol[],
}) => {
    const { setOficinas, setFetchingOficinas } = useOficinaStore();
    const {setAreas, setFetchingAreas} = useAreaStore();
    const {setRols, setFetchingRols} = useRolStore();

    useEffect(() => {
        setOficinas(oficinas);
        setFetchingOficinas(false);
        setAreas(areas)
        setFetchingAreas(false)
        setRols(rols)
        setFetchingRols(false)

    }, []);

    return <> {children} </>
};

