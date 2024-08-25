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
import { useEffect, useMemo, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useFormState } from "react-dom";
import { diseaseValidation, TDiseaseActionState, TDiseaseErrors } from "@/schema/enfermedadcultivo.schema";
import { useEnfermedadCultivoStore } from "@/context/enfermedad/enfermedad-cultivo.store";
import { useEnfermedadStore } from "@/context/enfermedad";

import { useAgricolaStore } from "@/context/agricola";
import { useTratamientoStore } from "@/context/tratamiento";
import { useAreaCultivoStore, useAreaStore } from "@/context/area";
import { useCultivoStore } from "@/context/cultivo";

const statusOptions = [
  { id: 'leve', name: 'Leve' },
  { id: 'medio', name: 'Medio' },
  { id: 'grave', name: 'Grave' },
  ]

export const FormDiseaseClient = ({
  
  onFormAction,
  crop,
}: {
  onFormAction: (
    prevState: TDiseaseActionState,
    data: FormData
  ) => Promise<TDiseaseActionState>;
  crop:number;
}) => {

  const { addEnfermedadCultivo } = useEnfermedadCultivoStore();
  const { enfermedades } = useEnfermedadStore();
  const { agricolas } = useAgricolaStore();
  const { tratamientos } = useTratamientoStore();
  const { areaCultivos } = useAreaCultivoStore();

  const [filteredAgricolas, setFilteredAgricolas] = useState(agricolas);


  const [state, formAction] = useFormState(onFormAction, {
    crop,
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof diseaseValidation>>({
    resolver: zodResolver(diseaseValidation),
    mode: "all",
    defaultValues: {
      disease: '',
      treatment: '',
      manager: '',
      grade: '',
      start: '',
      ...(state.fields ?? {}),
    },
  });

  const [pending, startTransaction] = useTransition();

  useEffect(() => {
    const areaForCrop = areaCultivos.find(cultivo => cultivo.crop.id === crop)?.area;

    if (areaForCrop) {
      const filtered = agricolas.filter(agricola => agricola.area.id === areaForCrop.id);
      setFilteredAgricolas(filtered);
    } else {
      setFilteredAgricolas([]);
    }
  }, [crop, agricolas, areaCultivos]);

  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof diseaseValidation>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof diseaseValidation>;
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData));
  };

  const enfermedadSelected = form.watch("disease");
  const tratamientoByEnfermedad = useMemo(() => {
    if (enfermedadSelected.length > 0) {
      return tratamientos.filter(el => String(el.disease.id) === enfermedadSelected)
    }
    return tratamientos
  }, [tratamientos, enfermedadSelected])

  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TDiseaseErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.enfermedadCultivo) {
      const newCultivo = {
        ...state.enfermedadCultivo,
      };
      addEnfermedadCultivo(newCultivo);
      form.reset();
    }
  }, [state.type, state.enfermedadCultivo]);

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
            name="disease"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Enfermedad</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={enfermedades}
                    value={field.value.length === 0 ? null : enfermedades.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el Enfermedad"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => typeof option?.id === "number" ? String(option?.id) : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="treatment"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Tratamiento</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={tratamientoByEnfermedad}
                    value={field.value.length === 0 ? null : tratamientoByEnfermedad.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el Tratamiento"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => typeof option?.id === "number" ? String(option?.id) : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
        <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Encargado</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={filteredAgricolas}
                    value={field.value.length === 0 ? null : filteredAgricolas.find((el => String(el.trabajador_id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.trabajador_id === "number" ? String(value?.trabajador_id) : "")}
                    emptyOption="Seleccione el Encargado"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => typeof option?.trabajador_id === "number" ? String(option?.trabajador_id) : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
        <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Grado</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={statusOptions}
                    value={field.value.length === 0 ? null : statusOptions.find((el => el.id === field.value))}
                    onChange={(value) => field.onChange(value?.id ?? "")}
                    emptyOption="Selecciona El Grado"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => option?.id ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</FormLabel>
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
