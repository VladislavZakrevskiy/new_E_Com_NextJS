import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: any }) {
	try {
		const id = context.params.id;
		const product = await prisma.product.findUnique({
			where: { product_id: id },
            include: {feedbacks: true, tags: true}
		});
        return NextResponse.json(product)
	} catch (e) {
		console.log(e);
		return ApiError.serverError();
	}
}
