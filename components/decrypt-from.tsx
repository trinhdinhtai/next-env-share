"use client"

import { Fragment, useEffect, useState } from "react"
import { LATEST_KEY_VERSION } from "@/constants"
import { decryptSchema } from "@/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { decodeCompositeKey } from "@/lib/encoding"
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
import { Title } from "@/components/title"

import { LoadingDots } from "./ui/loading-dots"

interface DecryptFormProps {
  setText: (text: string) => void
}

const DecryptForm = ({ setText }: DecryptFormProps) => {
  const form = useForm<z.infer<typeof decryptSchema>>({
    resolver: zodResolver(decryptSchema),
    defaultValues: {
      compositeKey: "",
    },
  })

  const onSubmit = async ({ compositeKey }: z.infer<typeof decryptSchema>) => {
    try {
      const { id, encryptionKey, version } = decodeCompositeKey(compositeKey)

      const response = await axios.post(`/api/v1/load/${id}`)

      const { encrypted, remainingReads, iv } = response.data
    } catch (error) {
      console.log("error", error)
    }
  }

  const {
    control,
    setValue,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue("compositeKey", window.location.hash.replace(/^#/, ""))
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl">
      <Title>Decrypt a document</Title>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-12 rounded border border-zinc-600 px-3 py-2 text-muted-foreground transition-all focus-within:border-zinc-100/80 focus-within:text-primary hover:border-zinc-100/80 hover:text-primary sm:col-span-2">
            <FormField
              control={control}
              name="compositeKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">id</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full font-bold uppercase">
            {isSubmitting ? <LoadingDots /> : "Unseal"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default DecryptForm
