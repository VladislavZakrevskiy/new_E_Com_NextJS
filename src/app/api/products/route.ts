import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const take = Number(req.nextUrl.searchParams.get('take'));
		const tags = req.nextUrl.searchParams.get('tags');
		const skip = Number(req.nextUrl.searchParams.get('page'));
		const from_rating = Number(req.nextUrl.searchParams.get('from_rating'));
		const to_rating = Number(req.nextUrl.searchParams.get('to_rating'));
		const from_price = Number(req.nextUrl.searchParams.get('from_price'));
		const to_price = Number(req.nextUrl.searchParams.get('to_price'));

		const products = await prisma.product.findMany({
			take: take || 10,
			skip: take * (skip - 1) || 0,
			where: {
				rating: { gte: from_rating || 0, lte: to_rating || Infinity },
				price: { gte: from_price || 0, lte: to_price || Infinity },
				tag_id: tags || undefined,
			}
		});

        return NextResponse.json(products)
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}
