import db from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (id: string, title: string, description?: string) => {
    try {
        await db.todo.update({
            where: { id },
            data: { title, description }
        })

        return NextResponse.json({ message: "Todo updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Todo update failed" }, { status: 500 });
    }
}