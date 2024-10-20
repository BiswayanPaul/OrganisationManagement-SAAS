import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { todoSchema } from "@/lib/schemas";
import { ZodError } from 'zod';

export async function POST(request: Request) {
    console.log("POST request received in create route");
    try {
        const body = await request.json();
        console.log("Request body:", body);

        const validatedData = todoSchema.parse(body);
        console.log("Validated data:", validatedData);

        const todo = await prisma.todo.create({
            data: validatedData,
        });

        console.log("Todo created:", todo);
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error('Error creating todo:', error);
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return NextResponse.json({ error: errorMessages[0] }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}
