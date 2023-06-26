import { ApiError } from "@/lib/dtoAPI";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (req: NextRequest) {
    try {
        const {feedback_id} = await req.json()
        const feedback = await prisma.feedback.delete({where: {feedback_id}})
        return NextResponse.json(feedback)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}