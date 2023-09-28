import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

export const runtime = "edge"

const redis = Redis.fromEnv()

export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return new NextResponse("Id is required", { status: 400 })
    }

    const key = ["envshare", id].join(":")

    const [data, _] = await Promise.all([
      await redis.hgetall<{
        encrypted: string
        remainingReads: number | null
        iv: string
      }>(key),
      await redis.incr("envshare:metrics:reads"),
    ])

    if (!data) {
      return new NextResponse("Not Found", { status: 404 })
    }

    if (data.remainingReads !== null && data.remainingReads < 1) {
      await redis.del(key)
      return new NextResponse("Not Found", { status: 404 })
    }

    let remainingReads: number | null = null
    if (data.remainingReads !== null) {
      // Decrement the number of reads and return the remaining reads
      remainingReads = await redis.hincrby(key, "remainingReads", -1)
    }

    return NextResponse.json({
      iv: data.iv,
      encrypted: data.encrypted,
      remainingReads,
    })
  } catch (error) {
    console.error("[LOAD_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
