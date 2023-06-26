import { ApiError } from "@/lib/dtoAPI"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST (req: NextRequest) {
    try {
        const {desc, name, price, tag_id} = await req.json()
        const product = await prisma.product.create({data: {desc, name, price, tag_id}})
        return NextResponse.json(product)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}

export async function DELETE (req: NextRequest) {
    try {
        const {product_id} = await req.json()
        const product = await prisma.product.delete({where: {product_id}})
        return NextResponse.json(product)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}

export async function PATCH (req: NextRequest) {
    try {
        const {product_id, desc, name, price} = await req.json()
        const product = await prisma.product.findUnique({where: {product_id}})
        if (product) {
            if(desc) {
                product.desc = desc
            }
            if (name) {
                product.name = name
            }
            if (price) {
                product.price = price
            }
        } else {
            return ApiError.badRequest('error', [])
        }
        const resData = await prisma.product.update({where: {product_id}, data: {...product}}) 
        return NextResponse.json(resData)
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}