import { NextRequest, NextResponse } from 'next/server';
import authService from '../services/auth';
import { ApiError } from '@/lib/dtoAPI';

interface ILoginBogy {
	email: string;
	password: string;
}

export async function POST(req: NextRequest) {
	try {
		const data: ILoginBogy = await req.json();
		const { email, password } = data;
		const loginData = await authService.login(email, password);
		return NextResponse.json(loginData).cookies.set(
			'refreshToken',
			loginData.refreshToken,
			{ httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }
		);
	} catch (e) {
		console.log(e);
		return ApiError.UnauthorizedError();
	}
}
