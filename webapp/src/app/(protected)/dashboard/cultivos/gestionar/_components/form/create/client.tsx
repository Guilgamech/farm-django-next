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
import {
  cultivoValidationSchema,
  TCultivo,
  TCultivoErrors,
  TCultivoFormActionState,
  TCultivoRead,
} from "@/schema/cultivo.schema";
import { useCultivoStore } from "@/context/cultivo";
import { useToast } from "@/components/ui/use-toast";
import { useTrabajadorStore } from "@/context/trabajador";
import { useTipoCultivoStore } from "@/context/tipoc";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useFormState } from "react-dom";

const statusOptions = [
  { id: 'semilleo', name: 'Semilleo' },
  { id: 'sembrado', name: 'Sembrado' },
  { id: 'cocecha', name: 'Cocecha' }
]

export const FormCultivoClient = ({
  onFormAction,
  row,
}: {
  onFormAction: (
    prevState: TCultivoFormActionState,
    data: FormData
  ) => Promise<TCultivoFormActionState>;
  row?: TCultivoRead;
}) => {
  const { addCultivo, setCultivo } = useCultivoStore();
  const { trabajadores } = useTrabajadorStore();
  const { tipocultivos } = useTipoCultivoStore();



  const id = row?.id;
  const defaultRow = {
    code: row?.code ?? "",
    status: row?.status ?? "",
    type: typeof row?.type !== "undefined" ? String(row.type.id) : "",
    manager: typeof row?.manager !== "undefined" ? String(row.manager.trabajador_id) : "",
  };


  const [state, formAction] = useFormState(onFormAction, {
    id,
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof cultivoValidationSchema>>({
    resolver: zodResolver(cultivoValidationSchema),
    mode: "all",
    defaultValues: {
      ...defaultRow,
      ...(state.fields ?? {}),
    },
  });

  const [pending, startTransaction] = useTransition();

  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof cultivoValidationSchema>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof cultivoValidationSchema>;
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData));
  };

  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TCultivoErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.cultivo) {
      const newCultivo = {
        ...state.cultivo,
        type: tipocultivos.find(el => el.id === state.cultivo?.type ?? 0) ?? tipocultivos[0],
        manager: trabajadores.find(el => el.trabajador_id === state.cultivo?.manager ?? 0) ?? trabajadores[0]
      };
      addCultivo(newCultivo);
      form.reset();
    }
    if (id && state.type === "edited" && state.cultivo) {
      const newCultivo = {
        ...state.cultivo,
        type: tipocultivos.find(el => el.id === state.cultivo?.type ?? 0) ?? tipocultivos[0],
        manager: trabajadores.find(el => el.trabajador_id === state.cultivo?.manager ?? 0) ?? trabajadores[0]
      };
      setCultivo({ id, data: newCultivo });
    }
  }, [state.type, state.cultivo]);

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
            name="code"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Código</FormLabel>
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
            name="status"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Estado</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={statusOptions}
                    value={field.value.length === 0 ? null : statusOptions.find((el => el.id === field.value))}
                    onChange={(value) => field.onChange(value?.id ?? "")}
                    emptyOption="Selecciona un estado"
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
            name="type"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Tipo</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={tipocultivos}
                    value={field.value.length === 0 ? null : tipocultivos.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el tipo"
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
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2 mt-5">Encargado</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={trabajadores}
                    value={field.value.length === 0 ? null : trabajadores.find((el => String(el.trabajador_id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.trabajador_id === "number" ? String(value?.trabajador_id) : "")}
                    emptyOption="Seleccione el Responsable"
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
