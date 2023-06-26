import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const tags = await prisma.tag.findMany();
		return NextResponse.json(tags);
	} catch (e) {
		console.log(e);
		return ApiError.serverError();
	}
}
