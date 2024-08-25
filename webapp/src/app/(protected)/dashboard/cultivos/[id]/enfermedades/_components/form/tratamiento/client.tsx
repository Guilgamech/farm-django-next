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
import { cureValidation, TCureActionState, TCureErrors  } from "@/schema/enfermedadcultivo.schema";
import { useEnfermedadCultivoStore } from "@/context/enfermedad/enfermedad-cultivo.store";
import { useEnfermedadStore } from "@/context/enfermedad";

export const FormCureClient = ({
  onFormAction,
  id,
  disease,
  crop
}: {
  onFormAction: (
    prevState: TCureActionState,
    data: FormData
  ) => Promise<TCureActionState>;
  id: number;
  disease: number;
  crop: number;
}) => {

  const { setEnfermedadCultivo } = useEnfermedadCultivoStore();
  const { enfermedades } = useEnfermedadStore();


  const [state, formAction] = useFormState(onFormAction, {
    id, disease, crop
  });


  const { toast } = useToast();
  const form = useForm<z.infer<typeof cureValidation>>({
    resolver: zodResolver(cureValidation),
    mode: "all",
    defaultValues: {
      end: '',
      ...(state.fields ?? {}),
    },
  });

  const [pending, startTransaction] = useTransition();

  const handleActionFormData = () => {
    const values = form.getValues() as z.infer<typeof cureValidation>;
    const newformData = new FormData();
    for (const key in values) {
      const typeKey = key as keyof z.infer<typeof cureValidation>;
      newformData.append(key, values[typeKey]);
    }
    return startTransaction(() => formAction(newformData));
  };

  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors };
      Object.keys(state.errors).forEach((el) => {
        const field = el as keyof TCureErrors;
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false });
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.type === "edited" && state.enfermedadCultivo) {
      const newCultivo = {
        ...state.enfermedadCultivo,
      };
      setEnfermedadCultivo({ id, data: newCultivo });
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
            name="end"
            render={({ field }) => (
              <FormItem onBlur={() => form.clearErrors("root")}>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Fin De Tratamiento</FormLabel>
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
