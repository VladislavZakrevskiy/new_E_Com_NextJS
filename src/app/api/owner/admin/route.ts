import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { Roles } from '@/lib/roles';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const admins = await prisma.user.findMany({
			where: { role: { equals: Roles.ADMIN } },
		});
        return NextResponse.json(admins)
	} catch (e) {
		console.log(e);
		return ApiError.serverError();
	}
}

export async function POST(req: NextRequest) {
	try {
		const { user_id, role } = await req.json();
		const user = await prisma.user.findUnique({
			where: { user_id },
		});
		if (user) {
			user.role = role;
		}
		const resData = await prisma.user.update({
			where: { user_id },
			data: { ...user },
		});
		return NextResponse.json(resData)
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}


export async function DELETE(req: NextRequest) {
	try {
        const { user_id } = await req.json();
		const user = await prisma.user.findUnique({
			where: { user_id },
		});
		if (user) {
			user.role = Roles.CLIENT;
		}
		const resData = await prisma.user.update({
			where: { user_id },
			data: { ...user },
		});
		return NextResponse.json(resData)
	} catch (e) {
		console.log(e);
		return ApiError.serverError();
	}
}
