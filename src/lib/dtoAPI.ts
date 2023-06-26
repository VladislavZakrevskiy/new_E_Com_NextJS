import { NextResponse } from "next/server";

export class ApiError extends Error {
    status;
    errors;

    constructor (status: number, message: any, errors: any = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return NextResponse.json({message: 'User is unauthorized', error: ['unathorized']}, {status: 401})
    }

    static badRequest (message: any,errors: string[]) {
        return NextResponse.json({message, errors}, {status: 400})
    }

    static serverError() {
        return NextResponse.json({message: 'Server Error', error: ['server error']}, {status: 500})
    }
}