"use server"
import { FormSeedClient } from "./client";
import { seedAction } from "@/server/areaCultivos.action";

export async function SeedForm({ id }: { id:string }) {
  const onFormAction = seedAction;
  return (
    <FormSeedClient
      onFormAction={onFormAction}
      crop={Number(id)}
    />
  );
}

