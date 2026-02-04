"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "Model name is required."),
  type: z.string().min(2, "Model type is required."),
  language: z.string().min(2, "Primary language is required."),
  dataset: z.string().min(2, "Training dataset is required."),
})

export function ModelForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      language: "",
      dataset: "",
    },
  })

  return (
    <div className="h-full bg-background">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-primary">Model details</h2>
        <p className="text-muted-foreground">Define the basics for your new model.</p>
      </div>
      <Form {...form}>
        <form className="mt-6 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. studio-voice-v2" {...field} />
                </FormControl>
                <FormDescription>Use a short, memorable identifier.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Conversational TTS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary language</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. English (US)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training dataset</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Narration set 2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create model
          </Button>
        </form>
      </Form>
    </div>
  )
}
