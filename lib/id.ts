import { ID_LENGTH } from "@/constants"

import { toBase58 } from "./base58"

export function generateId(): string {
  const bytes = new Uint8Array(ID_LENGTH)
  crypto.getRandomValues(bytes)
  return toBase58(bytes)
}
