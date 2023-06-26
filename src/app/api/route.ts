import { ApiError } from "@/lib/dtoAPI"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET (req: NextRequest) {
    try {
        return NextResponse.json('ok')
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}
