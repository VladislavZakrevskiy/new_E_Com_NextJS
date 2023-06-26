import { NextRequest, NextResponse } from 'next/server';
import authService from '../services/auth';
import { ApiError } from '@/lib/dtoAPI';

export async function GET(req: NextRequest) {
	try {
		const user_id = req.nextUrl.searchParams.get('id');
		if (user_id) {
			const loginData = await authService.logout(user_id);
			return NextResponse.json(loginData).cookies.delete('refreshToken');
		} else {
            return NextResponse.json('error', {status: 400})
        }
	} catch (e) {
		console.log(e);
		return ApiError.UnauthorizedError();
	}
}
