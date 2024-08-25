// chart.schema.ts
export type ScaleType = "time" | "band" | "point" | "log" | "pow" | "sqrt" | "utc" | "linear";

export type PieChartData = {
    value: number;
    label: string;
};


export type BarData = {
    xAxis: {
      id: string;
      data: string[];
      scaleType: 'band';
    }[];
    series: {
      data: number[];
    }[];
  };

export interface ChartProps {
    type: 'bar' | 'pie';
    barData?: BarData;
    pieData?: PieChartData[];
    width: number;
    height: number;
    skipAnimation?: boolean;
    
}
