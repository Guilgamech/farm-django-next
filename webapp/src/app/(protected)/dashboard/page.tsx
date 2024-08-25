import * as React from 'react';

import { DashboardCards } from "./_components/cards";
import { DashboardCharts } from "./_components/charts";

export default function Dashboard() {
  return (
    <div className="page-content">
      <div className="card-container flex justify-around mb-5">
      <DashboardCards />
      </div>
      <div className="charts-container flex space-x-2">
      <DashboardCharts />
      </div>
    </div>
  );
}
