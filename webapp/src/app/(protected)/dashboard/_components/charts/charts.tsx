// src/components/dashboard/cards.tsx
"use client"
import { useCultivoStore } from "@/context/cultivo";
import { useEffect, useMemo } from "react";
import { useEnfermedadCultivoStore } from "@/context/enfermedad/enfermedad-cultivo.store";
import ChartComponent from "@/components/shared/charts/chart";
import { PieChartData } from "@/schema/chart.schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TCultivoRead } from "@/schema/cultivo.schema";

export function DashboardCharts() {
    const { cultivos, fetchingCultivos, setFetchingCultivos } = useCultivoStore();
    const { enfermedadCultivos, fetchingEnfermedadCultivos, setFetchingEnfermedadCultivos } = useEnfermedadCultivoStore();
  
  
    useEffect(() => {
      setFetchingCultivos(false);
      setFetchingEnfermedadCultivos(false);
  
    }, [setFetchingCultivos, setFetchingEnfermedadCultivos]);

    const  reduceBarFunction = (enfermedadCultivos: any[]) => {
      return enfermedadCultivos.reduce((acc, enfermedadCultivo) => {
        const cultivoName = enfermedadCultivo.crop.code; // Usa el código del Cultivo
        
        // Incrementa el contador de enfermedades para el cultivo específico
        acc[cultivoName] = (acc[cultivoName] || 0) + 1;
        
        return acc;
      }, {} as { [key: string]: number });
    }
    const reducePieFunction = (acc: PieChartData[], crop: TCultivoRead) => {
        const label = crop.name;
        let item = acc.find(el => el.label === label);
        if (item) {
          item.value += 1;
          acc = acc.map(el => (el.label === item.label ? item : el));
        } else {
          acc.push({ label, value: 1 });
        }
        return acc;
      };
    
      const PieData = cultivos.reduce(reducePieFunction, []);
    
      
      const barData = useMemo(() => {
        const enfermedadCounts = reduceBarFunction(enfermedadCultivos);
        
        return {
          xAxis: [
            {
              id: 'barCategories',
              data: Object.keys(enfermedadCounts),
              scaleType: 'band' as const,  // Explicitamente tipado como 'const'
            },
          ],
          series: [
            {
              data: Object.values(enfermedadCounts).map(count => Number(count)), // Convertir a números
            },
          ],
        };
      }, [enfermedadCultivos]);
  


  return (
    <>
              <Card className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-700">Gráfico de Cantidad de Enfermedades por Cultivos</h3>
          </CardHeader>
          <CardContent className="flex items-center justify-center w-full">
            {fetchingEnfermedadCultivos ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <ChartComponent
                type="bar"
                barData={barData}
                width={500}
                height={250}
              />
            )}
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-700">Gráfico de Cantidad de Cultivos</h3>
          </CardHeader>
          <CardContent className="flex items-center justify-center w-full">
            {fetchingCultivos ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <ChartComponent
                type="pie"
                pieData={PieData}
                width={500}
                height={250}
              />
            )}
          </CardContent>
        </Card>
    </>
  );
}
