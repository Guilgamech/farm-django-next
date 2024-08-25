"use client"

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
import { useFormState } from "react-dom";
import { Loader, Save } from "lucide-react";
import { BasicSubmit, SubmitButton } from "@/components/ui/submit";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  incidenciaValidationSchema,
  TIncidencia,
  TIncidenciaErrors,
  TIncidenciaFormActionState,
  TIncidenciaRead,
} from "@/schema/incidencia.schema";
import { useIncidenciaStore } from "@/context/incidencia";
import { useToast } from "@/components/ui/use-toast";
import { useAreaStore } from "@/context/area";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
const statusOptions = [
  { id: 'deteriorado', name: 'Deteriorado' },
  { id: 'optimo', name: 'Óptimo' }
  ]
export const FormIncidenciaClient = ({
  onFormAction,
  row,
}: {
  onFormAction: (
    prevState: TIncidenciaFormActionState,
    data: FormData
  ) => Promise<TIncidenciaFormActionState>;
  row?: TIncidenciaRead;
}) => {

  const { addIncidencia, setIncidencia } = useIncidenciaStore();
  const { areas } = useAreaStore();

  const id = row?.id;
  const defaultRow = {
    type: row?.type ?? "",
    date: row?.date ?? "",
    status: row?.status ?? "",
    damage: row?.damage ?? "",
    area: typeof row?.area !== "undefined" ? String(row.area.id) : "",
  };
  const [state, formAction] = useFormState(onFormAction, {
    id,
  });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof incidenciaValidationSchema>>({
    resolver: zodResolver(incidenciaValidationSchema),
    mode: "all",
    defaultValues: {
      ...defaultRow,
      ...(state.fields ?? {}),
    },
  });
  const [pending, startTransaction] = useTransition();
  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof incidenciaValidationSchema>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof incidenciaValidationSchema>
      const value = values[typeKey];
      if (value !== undefined) {
        newformData.append(key, String(value)); // Convierte cualquier valor a string
      }
    }
    return startTransaction(() => formAction(newformData))
  }
  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TIncidenciaErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.incidencia) {
      const newIncidencia = {
        ...state.incidencia,
        area: areas.find(el => el.id === state.incidencia?.area ?? 0) ?? areas[0],
      }
      addIncidencia(newIncidencia);
      form.reset();
    }
    if (id && state.type === "edited" && state.incidencia) {
      const newIncidencia = {
        ...state.incidencia,
        area: areas.find(el => el.id === state.incidencia?.area ?? 0) ?? areas[0],
      }
      setIncidencia({ id, data: newIncidencia });
    }
  }, [state.type, state.incidencia]);

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
            name="type"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Tipo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
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
            name="date"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Fecha</FormLabel>
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
        <div className="mb-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Estado</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
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
            name="damage"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Daño</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
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
            name="area"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Área</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={areas}
                    value={field.value.length === 0 ? null : areas.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el área"
                    getOptionLabel={(option) => option?.name ?? ""}
                    getOptionValue={(option) => typeof option?.id === "number" ? String(option?.id) : ""}
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
