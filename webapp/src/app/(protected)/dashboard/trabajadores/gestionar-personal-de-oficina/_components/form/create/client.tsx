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
  oficinaValidationSchema,
  TOficina,
  TOficinaErrors,
  TOficinaFormActionState,
  TOficinaRead,
} from "@/schema/oficina.schema";
import { useOficinaStore } from "@/context/oficina";
import { useToast } from "@/components/ui/use-toast";
import { useAreaStore } from "@/context/area";
import { SelectFilterComponent } from "@/components/shared/selectFilter/basic";
import { useRolStore } from "@/context/rol";

export const FormOficinaClient = ({
  onFormAction,
  row,
}: {
  onFormAction: (
    prevState: TOficinaFormActionState,
    data: FormData
  ) => Promise<TOficinaFormActionState>;
  row?: TOficinaRead;
}) => {

  const { addOficina, setOficina } = useOficinaStore();
  const { areas } = useAreaStore();
  const { rols } = useRolStore();

  const trabajador_id = row?.trabajador_id;
  const defaultRow = {
    name: row?.name ?? "",
    ci: row?.ci ?? "",
    age: typeof row?.age !== "undefined" ? String(row.age) : "",
    direction: row?.direction ?? "",
    username: row?.username ?? "",
    email: row?.email ?? "",
    password: row?.password ?? "",
    area: typeof row?.area !== "undefined" ? String(row.area.id) : "",
    rol: typeof row?.rol !== "undefined" ? String(row.rol.id) : "",
  };
  const [state, formAction] = useFormState(onFormAction, {
    trabajador_id,
  });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof oficinaValidationSchema>>({
    resolver: zodResolver(oficinaValidationSchema),
    mode: "all",
    defaultValues: {
      ...defaultRow,
      ...(state.fields ?? {}),
    },
  });
  const [pending, startTransaction] = useTransition();
  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof oficinaValidationSchema>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof oficinaValidationSchema>
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData))
  }
  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TOficinaErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "created" && state.oficina) {
      const newOficina = {
        ...state.oficina,
        area: areas.find(el => el.id === state.oficina?.area ?? 0) ?? areas[0],
        rol: rols.find(el => el.id === state.oficina?.rol ?? 0) ?? rols[0],
      }
      addOficina(newOficina);
      form.reset();
    }
    if (trabajador_id && state.type === "edited" && state.oficina) {
      const newOficina = {
        ...state.oficina,
        area: areas.find(el => el.id === state.oficina?.area ?? 0) ?? areas[0],
        rol: rols.find(el => el.id === state.oficina?.rol ?? 0) ?? rols[0],
      }
      setOficina({ trabajador_id, data: newOficina });
    }
  }, [state.type, state.oficina]);

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
            name="ci"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Carnet De Identidad</FormLabel>
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
            name="username"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Correo</FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
            name="age"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Edad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="direction"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Dirección</FormLabel>
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
        <div className="mb-4">
          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1 mt-5">Rol</FormLabel>
                <FormControl>
                  <SelectFilterComponent
                    classes={{
                      trigger: "w-full",
                      menuContainer: "w-full"
                    }}
                    options={rols}
                    value={field.value.length === 0 ? null : rols.find((el => String(el.id) === field.value))}
                    onChange={(value) => field.onChange(typeof value?.id === "number" ? String(value?.id) : "")}
                    emptyOption="Seleccione el rol"
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
            name="password"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
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
