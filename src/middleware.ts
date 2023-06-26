import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './lib/dtoAPI';
import tokenService from './app/api/auth/services/token';
import { prisma } from './lib/prisma';
import { Roles } from './lib/roles';

export const middleware = async (req: NextRequest) => {
	const pathname = req.nextUrl.pathname.split('/')[0];
	const auth = req.headers.get('Authorization');
	if (pathname !== 'auth') {
		// Access token validation
		if (!auth) {
			return ApiError.UnauthorizedError();
		}
		const accessToken = auth.split(' ')[1];
		if (!accessToken) {
			return ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return ApiError.UnauthorizedError();
		}

		const user = await prisma.user.findUnique({
			where: { user_id: userData.user_id },
		});
		const role = user?.role;

		// Admin Status validation
		if (pathname == 'admin') {
			if (role !== Roles.ADMIN || role !== Roles.OWNER) {
				return ApiError.badRequest('Not enough lows', [
					role !== Roles.ADMIN ? 'not admin' : 'not owner',
				]);
			}
		}
		if (pathname == 'owner') {
			if (role !== Roles.OWNER) {
				return ApiError.badRequest('Not enough lows', ['not owner']);
			}
		}
	}
	return NextResponse.next();
};
