// src/components/dashboard/cards.tsx
"use client"
import { CardDashboard } from "@/components/shared/card";
import { Users, TreePine, Tractor, LandPlot } from "lucide-react";
import { useTrabajadorStore } from "@/context/trabajador";
import { useCultivoStore } from "@/context/cultivo";
import { useAreaStore } from "@/context/area";
import { useFlotaStore } from "@/context/flota";
import { useEffect } from "react";

export function DashboardCards() {
  const { trabajadores, fetchingTrabajadores, setFetchingTrabajadores } = useTrabajadorStore();
  const { cultivos, fetchingCultivos, setFetchingCultivos } = useCultivoStore();
  const { flotas, fetchingFlotas, setFetchingFlotas } = useFlotaStore();
  const { areas, fetchingAreas, setFetchingAreas} = useAreaStore();

  useEffect(() => {
    setFetchingCultivos(false);
    setFetchingTrabajadores(false);
    setFetchingAreas(false);
    setFetchingFlotas(false);
  }, [setFetchingCultivos, setFetchingTrabajadores, setFetchingFlotas, setFetchingAreas]);

  return (
    <>
      <CardDashboard
        header={<p className="text-sm mb-0 uppercase">Trabajadores</p>}
        content={<div>{fetchingTrabajadores ? "Loading..." : trabajadores.length}</div>}
        icon={<Users />}
        iconColor="bg-yellow-600"
      />
      <CardDashboard
        header={<p className="text-sm mb-0 uppercase">Cultivos</p>}
        content={<div>{fetchingCultivos ? "Loading..." : cultivos.length}</div>}
        icon={<TreePine />}
        iconColor="bg-primary"
      />
      <CardDashboard
        header={<p className="text-sm mb-0 uppercase">Flotas</p>}
        content={<div>{fetchingFlotas ? "Loading..." : flotas.length}</div>}
        icon={<Tractor />}
        iconColor="bg-blue-600"
      />
      <CardDashboard
        header={<p className="text-sm mb-0 uppercase">Áreas</p>}
        content={<div>{fetchingAreas ? "Loading..." : areas.length}</div>}
        icon={<LandPlot />}
        iconColor="bg-green-600"
      />
    </>
  );
}
