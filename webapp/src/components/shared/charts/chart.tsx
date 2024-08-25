"use client"

import React, { useEffect, useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { PieChartData, ScaleType, BarData, ChartProps } from "@/schema/chart.schema";
import { useAreaStore } from '@/context/area';
import { useCultivoStore } from '@/context/cultivo';
import { useEnfermedadCultivoStore } from '@/context/enfermedad';
import { useFlotaStore } from '@/context/flota';
import { useTrabajadorStore } from '@/context/trabajador';



const ChartComponent: React.FC<ChartProps> = ({
  type,
  barData,
  pieData,
  width,
  height,
  skipAnimation = false
}) => {

  const renderChart = useMemo(() => {
    if (type === 'bar') {
      if (!barData || !barData.xAxis.length || !barData.series.length) {
        return <p>No data available for bar chart</p>;
      }

      return (
        <BarChart 
          xAxis={barData.xAxis.map(x => ({
            ...x,
            categoryGapRatio: 0.5,
            barGapRatio:  0.3,
          }))}
          series={barData.series.map(s => ({
            ...s,
            stack: 'default',
          }))}
          width={width}
          height={height}
          slotProps={{ legend: { hidden: true } }}
          skipAnimation={skipAnimation}
          
        />
      );
    }

    if (type === 'pie') {
      if (!pieData || pieData.length === 0) {
        return <p>No data available for pie chart</p>;
      }
      return (
        <PieChart
          series={[
            {
              data: pieData.map(item => ({
                id: item.label,
                value: item.value,
                label: item.label,
              })),
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 360,
              
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          width={width}
          height={height}
        />
      );
    }

    return null;
  }, [type, barData, pieData, width, height]);

  return renderChart;
};
export default ChartComponent;
