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
  enfermedadValidationSchema,
  TEnfermedad,
  TEnfermedadErrors,
  TEnfermedadFormActionState,
  TEnfermedadRead,
} from "@/schema/enfermedad.schema";
import { useEnfermedadStore } from "@/context/enfermedad";
import { useToast } from "@/components/ui/use-toast";
import { useAreaStore } from "@/context/area";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useTipoCultivoStore } from "@/context/tipoc";
const statusOptions = [
  { id: 'deteriorado', name: 'Deteriorado' },
  { id: 'optimo', name: 'Óptimo' }
  ]
export const FormEnfermedadClient = ({
  onFormAction,
  row,
}: {
  onFormAction: (
    prevState: TEnfermedadFormActionState,
    data: FormData
  ) => Promise<TEnfermedadFormActionState>;
  row?: TEnfermedadRead;
}) => {

  const { addEnfermedad, setEnfermedad } = useEnfermedadStore();
  const { tipocultivos } = useTipoCultivoStore();

  const id = row?.id;
  const defaultRow = {
    name: row?.name ?? "",
    category: row?.category ?? "",
    type_crops: typeof row?.type_crops !== "undefined" ? String(row.type_crops.id) : "",
  };
  const [state, formAction] = useFormState(onFormAction, {
    id,
  });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof enfermedadValidationSchema>>({
    resolver: zodResolver(enfermedadValidationSchema),
    mode: "all",
    defaultValues: {
      ...defaultRow,
      ...(state.fields ?? {}),
    },
  });
  const [pending, startTransaction] = useTransition();
  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof enfermedadValidationSchema>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof enfermedadValidationSchema>
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData))
  }
  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TEnfermedadErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.enfermedad) {
      const newEnfermedad = {
        ...state.enfermedad,
        type_crops: tipocultivos.find(el => el.id === state.enfermedad?.type_crops ?? 0) ?? tipocultivos[0],
      }
      addEnfermedad(newEnfermedad);
      form.reset();
    }
    if (id && state.type === "edited" && state.enfermedad) {
      const newEnfermedad = {
        ...state.enfermedad,
        type_crops: tipocultivos.find(el => el.id === state.enfermedad?.type_crops ?? 0) ?? tipocultivos[0],
      }
      setEnfermedad({ id, data: newEnfermedad });
    }
  }, [state.type, state.enfermedad]);

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
            name="name"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Nombre</FormLabel>
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
            name="category"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Categoria</FormLabel>
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
            name="type_crops"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Tipo De Cultivos</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={tipocultivos}
                    value={field.value.length === 0 ? null : tipocultivos.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el Tipo de Cultivo"
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
