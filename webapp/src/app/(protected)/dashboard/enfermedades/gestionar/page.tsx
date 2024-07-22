"use client";

import * as React from "react";
import { SelectComponent } from "@/components/shared/select";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { CommandDemo } from "@/components/shared/selectFilter/sample";
import { ComboboxDemo } from "@/components/shared/selectFilter/combo";

type AreaType = {
  id: string;
  name: string;
};

type WorkerType = {
  id: string;
  name: string;
  areaId: string;
};

const areas: AreaType[] = [
  { id: '1', name: 'Area 1' },
  { id: '2', name: 'Area 2' },
  { id: '3', name: 'Area 3' },
  { id: '4', name: 'Area 4' },
  { id: '5', name: 'Area 5' },
  { id: '6', name: 'Area 6' },
  { id: '7', name: 'Area 7' },
  { id: '8', name: 'Area 8' },
  { id: '9', name: 'Area 9' }
];

const workers: WorkerType[] = [
  { id: '1', name: 'Worker 1', areaId: '1' },
  { id: '2', name: 'Worker 2', areaId: '2' },
  { id: '3', name: 'Worker 3', areaId: '1' },
  { id: '4', name: 'Worker 4', areaId: '3' },
  { id: '5', name: 'Worker 5', areaId: '2' },
];

export default function GestionarEnfermedadesPage() {
  const [selectedArea, setSelectedArea] = React.useState<AreaType | null>(null);
  const [filteredWorkers, setFilteredWorkers] = React.useState<WorkerType[]>([]);
  const [selectedWorker, setSelectedWorker] = React.useState<WorkerType | null>(null);



  return <div className="page-content">
    <div>
      
      <div className="mt-5"></div>
      <CommandDemo/>
      <h1>Test Select Component</h1>
      <SelectFilterComponent
        options={areas}
        value={selectedArea}
        onChange={setSelectedArea}
        label="Select an Area"
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
      />

      <div className="mb-2 mt-2">
        Selected Area: {selectedArea?.name ?? "nothing selected"}
      </div>
    </div>
  </div>
}