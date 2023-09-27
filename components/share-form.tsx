"use client"

import { Fragment, useState } from "react"
import { LATEST_KEY_VERSION } from "@/constants"
import { shareSchema } from "@/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toBase58 } from "@/lib/base58"
import { encodeCompositeKey } from "@/lib/encoding"
import { encrypt } from "@/lib/encryption"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/title"

interface ShareFormProps {
  setLink: (link: string) => void
  setCopied: (copied: boolean) => void
}

const ShareForm = ({ setLink, setCopied }: ShareFormProps) => {
  const form = useForm<z.infer<typeof shareSchema>>({
    resolver: zodResolver(shareSchema),
    defaultValues: {
      text: "",
      remainingReads: "999",
      timeToLive: "7",
      multiple: "86400",
    },
  })

  const onSubmit = async ({
    text,
    remainingReads,
    timeToLive,
    multiple,
  }: z.infer<typeof shareSchema>) => {
    const { encrypted, iv, key } = await encrypt(text)

    const response = await axios.post("/api/v1/store", {
      encrypted: toBase58(encrypted),
      iv: toBase58(iv),
      reads: parseInt(remainingReads),
      ttl: parseInt(timeToLive) * parseInt(multiple),
    })

    const { id } = response.data

    const compositeKey = encodeCompositeKey(LATEST_KEY_VERSION, id, key)

    const url = new URL(window.location.href)
    url.pathname = "/unseal"
    url.hash = compositeKey

    setCopied(false)
    setLink(url.toString())
  }

  const { control, setValue } = form

  return (
    <div>
      <Title>Encrypt and Share</Title>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <pre className="mt-8 rounded border border-zinc-600 bg-transparent px-4 py-3 text-left font-mono text-zinc-100 focus:border-zinc-100/80 focus:ring-0 sm:text-sm">
                    <div className="flex items-start px-1 text-sm">
                      <div
                        aria-hidden="true"
                        className="select-none border-r border-zinc-300/5 pr-4 font-mono text-zinc-700"
                      >
                        {Array.from({
                          length: field.value.split("\n").length,
                        }).map((_, index) => (
                          <Fragment key={index}>
                            {(index + 1).toString().padStart(2, "0")}
                            <br />
                          </Fragment>
                        ))}
                      </div>

                      <Textarea
                        placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
                        minLength={1}
                        rows={Math.max(5, field.value.split("\n").length)}
                        {...field}
                      />
                    </div>
                  </pre>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-5">
            <div className="rounded border border-zinc-600 px-3 py-2 text-muted-foreground transition-all focus-within:border-zinc-100/80 focus-within:text-primary hover:border-zinc-100/80 hover:text-primary sm:col-span-2">
              <FormField
                control={control}
                name="remainingReads"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase">reads</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded border border-zinc-600 px-3 py-2 text-muted-foreground transition-all focus-within:border-zinc-100/80 focus-within:text-primary hover:border-zinc-100/80 hover:text-primary sm:col-span-2">
              <div className="flex items-end">
                <FormField
                  control={control}
                  name="timeToLive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase">ttl</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="multiple"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Days" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="60">minutes</SelectItem>
                          <SelectItem value="3600">hours</SelectItem>
                          <SelectItem value="86400">days</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="h-full rounded border border-zinc-600 text-muted-foreground transition-all hover:border-zinc-100/80 hover:text-primary sm:col-span-1">
              <label
                className="whitespace-no-wrap flex h-full cursor-pointer items-center justify-center rounded text-sm"
                htmlFor="file_input"
              >
                Upload a file
              </label>
              <input
                className="hidden"
                id="file_input"
                type="file"
                onChange={(e) => {
                  const file = e.target.files![0]
                  if (file.size > 1024 * 16) {
                    // setError("text")
                    return
                  }

                  const reader = new FileReader()
                  reader.onload = (e) => {
                    const t = e.target!.result as string
                    setValue("text", t)
                  }
                  reader.readAsText(file)
                }}
              />
            </div>
          </div>

          <Button type="submit" className="w-full font-bold uppercase">
            Share
          </Button>

          <div className="mt-8">
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <p>
                  <span className="font-semibold text-zinc-400">Reads:</span>{" "}
                  The number of reads determines how often the data can be
                  shared, before it deletes itself. 0 means unlimited.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-zinc-400">TTL:</span> You
                  can add a TTL (time to live) to the data, to automatically
                  delete it after a certain amount of time. 0 means no TTL.
                </p>
              </li>
              <p>
                Clicking Share will generate a new symmetrical key and encrypt
                your data before sending only the encrypted data to the server.
              </p>
            </ul>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ShareForm
