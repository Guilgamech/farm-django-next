"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useResultsDetailStore } from "@/context/result-detail.store"
import { useState } from "react"
import { EmailSchema } from "@/schema/share"
import { z } from "zod"

export function ShareForm() {
  const { selected } = useResultsDetailStore()
  const [sending, setSending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "all"
  })

  async function onSubmit(data: z.infer<typeof EmailSchema>) {
    setSending(true)
    const parsed = EmailSchema.safeParse(data)
    if (parsed.success && selected) {
      const response = await fetch(`/api/results/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_entered_email: parsed.data.email,
          patient_share_post_id: String(selected.pec_event_id)
        }),
        cache: "no-store"
      })
      if (response.ok) {
        toast({
          title: "Your result has been shared successfully!",
          variant: "success"
        })
      } else {
        toast({
          title: "Please login again.",
          variant: "destructive"
        })
      }
    }
    else {
      toast({
        title: "Please check email before send.",
        variant: "destructive"
      })
    }
    setSending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="sample@email.com" {...field} disabled={sending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit" disabled={sending}>
            {sending ? "Sharing" : "Share"}
          </Button>
        </div>

      </form>
    </Form>
  )
}