import { ApiError } from '@/lib/dtoAPI';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: any }) {
	try {
		const id: string = context.params.id;
		const feedback = await prisma.feedback.findUnique({
			where: { feedback_id: id },
		});
		return NextResponse.json(feedback);
	} catch (e) {
		console.log(e);
		return NextResponse.json({}, { status: 500 });
	}
}

export async function POST(req: NextRequest, context: { params: any }) {
	try {
		const id: string = context.params.id;
		const data = await req.json();
		const feedback = await prisma.feedback.findUnique({
			where: { feedback_id: id },
		});
		if (feedback?.likes.includes(data.user_id)) {
			feedback.likes = feedback.likes.filter((el) => el !== data.user_id);
		} else {
			feedback?.likes.push(data.user_id);
		}
		const resData = await prisma.feedback.update({
			where: { feedback_id: feedback?.feedback_id },
			data: { ...feedback },
		});
		return NextResponse.json(resData);
	} catch (e) {
		console.log(e);
		return NextResponse.json({}, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, context: { params: any }) {
	try {
		const id: string = context.params.id;
		const data = await req.json();
		const feedback = await prisma.feedback.findUnique({
			where: { feedback_id: id },
		});
		if (feedback) {
			feedback.text = data.text;
		}
		const resData = await prisma.feedback.update({
			data: { ...feedback },
			where: { feedback_id: feedback?.feedback_id },
		});
        return NextResponse.json(resData)
	} catch (e) {
		console.log(e);
        return ApiError.serverError()
	}
}
