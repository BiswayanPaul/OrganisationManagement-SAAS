"use server"

import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const todos = await db.todo.findMany();

        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch todos" }, { status: 500 });
    }
}

