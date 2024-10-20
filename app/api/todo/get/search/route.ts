"use server"

import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title");

    if (!title) {
        return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const todos = db.todo.findMany({
        where: {
            title: title
        }
    })

    return NextResponse.json({ todos }, { status: 200 });
}

