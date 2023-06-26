import { NextRequest, NextResponse } from "next/server";
import authService from '../services/auth';
import { ApiError } from "@/lib/dtoAPI";

export async function POST(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get('refreshToken')?.value
        if (refreshToken) {
            const userData = await authService.refresh(refreshToken)
            return NextResponse.json(userData).cookies.set('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        } else {
            return ApiError.badRequest('error', [])
        }
    } catch (e) {
        console.log(e)
        return ApiError.serverError()
    }
}