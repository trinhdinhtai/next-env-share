export async function generateKey() {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 128,
    },
    true,
    ["encrypt", "decrypt"]
  )
}

export async function encrypt(
  text: string
): Promise<{ encrypted: Uint8Array; iv: Uint8Array; key: Uint8Array }> {
  const key = await generateKey()

  const iv = crypto.getRandomValues(new Uint8Array(16))

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    new TextEncoder().encode(text)
  )

  const exportedKey = await crypto.subtle.exportKey("raw", key)
  return {
    encrypted: new Uint8Array(encryptedBuffer),
    key: new Uint8Array(exportedKey),
    iv,
  }
}
