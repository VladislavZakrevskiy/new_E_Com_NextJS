import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get('id');
		let take = Number(req.nextUrl.searchParams.get('take'));
		let skip = Number(req.nextUrl.searchParams.get('page'));
		if (id) {
			if (!skip) {
				skip = 1;
			}
			if (!take) {
				take = 10;
			}
			const feedbacks = await prisma.feedback.findMany({
				where: { product_id: id },
				skip: take * (skip - 1),
				take,
			});
			return NextResponse.json(feedbacks);
		} else {
			return ApiError.badRequest('error', [])
		}
	} catch (e) {
		console.log(e)
        return ApiError.serverError()
	}
}

export async function POST(req: NextRequest) {
	try {
		const { text, product_id, user_id } = await req.json();
		const feedback = await prisma.feedback.create({
			data: { text, product_id, user_id },
		});
        return NextResponse.json(feedback)
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}

export async function DELETE(req: NextRequest) {
	try {
        const id = req.nextUrl.searchParams.get('id')
        if (id) {
            const feedback = await prisma.feedback.delete({where: {feedback_id: id}})
            return NextResponse.json(feedback)
        } else {
			return ApiError.badRequest('error', [])
        }
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}

