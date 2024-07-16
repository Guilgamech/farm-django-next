"use client"
import { Input } from "@/components/ui/input"
import { authSchema } from "@/schema/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormState } from "react-dom";
import { Fingerprint, Loader } from "lucide-react"
import { PrevStateLogin } from "@/server/auth.action"
import { SubmitButton } from "@/components/ui/submit"
import { useEffect } from "react"

export default function ClientLoginForm({
  onFormAction,
}: {
  onFormAction: (
    prevState: PrevStateLogin,
    data: FormData
  ) => Promise<PrevStateLogin>;
}) {
  const [state, formAction] = useFormState(onFormAction, {});
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      ...(state.fields ?? {})
    },
  })
  useEffect(()=>{
    if(state.issues){
      let issues = {...state.issues}
      Object.keys(issues).forEach(el=>{
        const field = el as "email" | "password" | "root"
        const issueKey = el as keyof { email?: string | undefined; password?: string | undefined; root?: string | undefined; }
        form.setError(field, { type: "focus", message: issues[issueKey] ?? "" }, { shouldFocus: true })
      })
    }
  }, [state.issues])
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
          name="email"
          render={({ field }) => (
            <FormItem onBlur={()=>form.clearErrors("root")}>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Email</FormLabel>
              <FormControl>
                <Input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" {...field} />
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
            <FormItem onBlur={()=>form.clearErrors("root")}>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Contraseña</FormLabel>
              <FormControl>
                <Input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" type="password" autoComplete="current_password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <SubmitButton
        className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded"
        icon={<Fingerprint className="h-6 w-6" />}
        text="Acceder"
        loadingIcon={<Loader className="h-6 w-6 slow-spin" />}
        loadingText="Accediendo"
      />
    </form>
  </Form>
}