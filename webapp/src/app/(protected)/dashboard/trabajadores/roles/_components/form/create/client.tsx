"use client"
import { Input } from "@/components/ui/input"
import { authSchema } from "@/schema/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormState } from "react-dom";
import { Loader, Save } from "lucide-react"
import { SubmitButton } from "@/components/ui/submit"
import { useEffect } from "react"
import { rolValidationSchema, TRol, TRolErrors, TRolFormActionState } from "@/schema/rol.schema"
import { useRolStore } from "@/context/rol"
import { useToast } from "@/components/ui/use-toast"

export const FormRolClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TRolFormActionState,
    data: FormData
  ) => Promise<TRolFormActionState>;
  row?: TRol
}) => {
  const { addRol, setRol } = useRolStore()
  const id = row?.id
  const defaultRow = {
    name: row?.name ?? "",
  }
  const [state, formAction] = useFormState(onFormAction, {
    id
  });
  const { toast } = useToast()
  const form = useForm<z.infer<typeof rolValidationSchema>>({
    resolver: zodResolver(authSchema),
    mode: "all",
    defaultValues: {
      ...(defaultRow),
      ...(state.fields ?? {}),      
    },
  })
  useEffect(() => {
    if (state.errors) {
      const issues = { ...state.errors }
      Object.keys(state.errors).forEach(el => {
        const field = el as keyof TRolErrors
        form.setError(field, { type: "focus", message: issues[field] ?? "" }, { shouldFocus: false })
      })
    }
  }, [state.errors])
  useEffect(() => {
    if (state.type === "created" && state.rol) {
      addRol(state.rol)
      form.reset()
    }
    if (id && state.type === "edited" && state.rol) {
      setRol({ id, data: state.rol })
    }
  }, [state.type, state.rol])
  useEffect(() => {
    if (state.toast) {
      toast({
        variant: state.toast.type === "success" ? "default" : "destructive",
        title: state.toast.title,
        description: state.toast.message,
      })
    }
  }, [state.toast, toast])
  return <Form {...form}>
    <form
      action={formAction}
    >
      {((form.formState.errors.root?.message?.length) ?? 0 > 0) && <div className="text-lg text-destructive dark:text-red-400 text-center mb-4">
        {form.formState.errors.root?.message}
      </div>}
      <div className="mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem onBlur={() => form.clearErrors("root")}>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Nombre</FormLabel>
              <FormControl>
                <Input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <SubmitButton
        className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded"
        icon={<Save className="h-6 w-6" />}
        text="Guardar Datos"
        loadingIcon={<Loader className="h-6 w-6 slow-spin" />}
        loadingText="Guardando Datos"
      />
    </form>
  </Form>
}