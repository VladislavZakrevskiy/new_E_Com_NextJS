import { ApiError } from "@/lib/dtoAPI";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {
        const {tag} = await req.json()
        const tagData = await prisma.tag.create({data: {tag}})
        return NextResponse.json(tagData)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}

export async function DELETE (req: NextRequest) {
    try {
        const {tag_id} = await req.json()
        const tagData = await prisma.tag.delete({where: {tag_id}})
        return NextResponse.json(tagData)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}
