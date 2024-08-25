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
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useFormState } from "react-dom";
import { trabajadorValidation, TTrabajadorActionState, TTrabajadorErrors } from "@/schema/agricolacultivo.schema";
import { useAgricolaCultivoStore } from "@/context/agricola/agricola-cultivo.store";
import { useAgricolaStore } from "@/context/agricola";
import { useAreaCultivoStore, useAreaStore } from "@/context/area";

export const FormTrabajadorClient = ({
  onFormAction,
  crop,
}: {
  onFormAction: (
    prevState: TTrabajadorActionState,
    data: FormData
  ) => Promise<TTrabajadorActionState>;
  crop:number;
}) => {

  const { addAgricolaCultivo } = useAgricolaCultivoStore();
  const { areaCultivos } = useAreaCultivoStore();
  const { agricolas } = useAgricolaStore();

  const [filteredAgricolas, setFilteredAgricolas] = useState(agricolas);

  const [state, formAction] = useFormState(onFormAction, {
    crop,
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof trabajadorValidation>>({
    resolver: zodResolver(trabajadorValidation),
    mode: "all",
    defaultValues: {
      worker: '',
      ...(state.fields ?? {}),
    },
  });

  const [pending, startTransaction] = useTransition();

  useEffect(() => {
    // Find the area associated with the given crop ID
    const areaForCrop = areaCultivos.find(cultivo => cultivo.crop.id === crop)?.area;

    if (areaForCrop) {
      // Filter agricola workers based on the found area
      const filtered = agricolas.filter(agricola => agricola.area.id === areaForCrop.id);
      setFilteredAgricolas(filtered);
    } else {
      setFilteredAgricolas([]);
    }
  }, [crop, agricolas, areaCultivos]);

  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof trabajadorValidation>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof trabajadorValidation>;
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData));
  };

  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TTrabajadorErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.agricolaCultivo) {
      const newCultivo = {
        ...state.agricolaCultivo,
      };
      addAgricolaCultivo(newCultivo);
      form.reset();
    }
  }, [state.type, state.agricolaCultivo]);

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
            name="worker"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Trabajador</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={filteredAgricolas}
                    value={field.value.length === 0 ? null : filteredAgricolas.find(el => String(el.trabajador_id) === field.value)}
                    onChange={(value) => field.onChange(typeof value?.trabajador_id === "number" ? String(value?.trabajador_id) : "")}
                    emptyOption="Seleccione el Trabajador"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => typeof option?.trabajador_id === "number" ? String(option?.trabajador_id) : ""}
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
