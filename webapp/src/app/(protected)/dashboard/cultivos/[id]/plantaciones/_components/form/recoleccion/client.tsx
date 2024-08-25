"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Save } from "lucide-react";
import { BasicSubmit } from "@/components/ui/submit";
import { useEffect, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useFormState } from "react-dom";
import { harvestValidation, seedValidation, THarvestActionState, THarvestErrors, TSeedActionState, TSeedErrors } from "@/schema/areacultivo.schema";
import { useAreaCultivoStore } from "@/context/area/area-cultivo.store";
import { useAreaStore } from "@/context/area";

export const FormHarvestClient = ({
  onFormAction,
  id,
  area,
  crop
}: {
  onFormAction: (
    prevState: THarvestActionState,
    data: FormData
  ) => Promise<THarvestActionState>;
  id: number;
  area: number;
  crop: number;
}) => {

  const { setAreaCultivo } = useAreaCultivoStore();
  const { areas } = useAreaStore();


  const [state, formAction] = useFormState(onFormAction, {
    id, area, crop
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof harvestValidation>>({
    resolver: zodResolver(harvestValidation),
    mode: "all",
    defaultValues: {
      date_harved: '',
      ...(state.fields ?? {}),
    },
  });

  const [pending, startTransaction] = useTransition();

  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof harvestValidation>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof harvestValidation>;
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData));
  };

  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof THarvestErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "edited" && state.areaCultivo) {
      const newCultivo = {
        ...state.areaCultivo,
      };
      setAreaCultivo({ id, data: newCultivo });
      form.reset();
    }
  }, [state.type, state.areaCultivo]);

  useEffect(() => {
    if (state.toast) {
      toast({
        variant: state.toast.type === "success" ? "default" : "destructive",
        title: state.toast.title,
        description: state.toast.message,
      });
    }
  }, [state.toast, toast]);

  return (
    <Form {...form}>
      <form action={handleActionFormData}>
        {((form.formState.errors.root?.message?.length) ?? 0 > 0) && (
          <div className="text-lg text-destructive dark:text-red-400 text-center mb-4">
            {form.formState.errors.root?.message}
          </div>
        )}
        <div className="mb-4">
          <FormField
            control={form.control}
            name="date_harved"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Fecha de Recolección</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <BasicSubmit
          className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded"
          icon={<Save className="h-6 w-6" />}
          text="Guardar Datos"
          loadingIcon={<Loader className="h-6 w-6 slow-spin" />}
          loadingText="Guardando Datos"
          pending={pending}
        />
      </form>
    </Form>
  );
};
