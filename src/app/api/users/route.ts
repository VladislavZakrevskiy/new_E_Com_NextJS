import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { ApiError } from '@/lib/dtoAPI';

export async function GET(req: NextRequest) {
	try {
		const user_id = req.nextUrl.searchParams.get('id');
		if (user_id) {
			const user = await prisma.user.findUnique({ where: { user_id } });
			return NextResponse.json(user);
		} else {
			return ApiError.badRequest('error', [])
		}
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { user_id } = await req.json();
		const user = await prisma.user.delete({ where: { user_id } });
		return NextResponse.json(user);
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const { user_id, email, password } = await req.json();
		const user = await prisma.user.findUnique({ where: { user_id } });
		let hashPassword = user?.password;
		if (password) {
			hashPassword = await bcrypt.hash(password, 7);
		}
		let tempEmail = user?.email;
		if (email) {
			tempEmail = email;
		}
		const resUser = await prisma.user.update({
			where: { user_id },
			data: { email: tempEmail, password: hashPassword },
		});
        return NextResponse.json(resUser)
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}
