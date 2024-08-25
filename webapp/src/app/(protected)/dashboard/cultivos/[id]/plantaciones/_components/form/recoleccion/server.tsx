import { FormHarvestClient } from "./client";
import { harvestAction } from "@/server/areaCultivos.action";

export function HarvestForm({ id, crop, area }: { id: number; crop: number; area: number; }) {
  const onFormAction = harvestAction;
  return (
    <FormHarvestClient
      onFormAction={onFormAction}
      id={id}
      crop={crop}
      area={area}
    />
  );
}
