"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { TodoInput } from "@/lib/schemas"
import { toast } from 'react-toastify';

interface TodoFormProps {
    onClose: () => void;
}

export default function TodoForm({ onClose }: TodoFormProps) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        try {
            const todoData: TodoInput = { title, description };

            const response = await fetch('/api/todo/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData),
            });

            if (response.ok) {
                toast.success("Todo added successfully!");
                setTitle("");
                setDescription("");
                onClose(); // Close the form after successful submission
            } else {
                const errorData = await response.json();
                toast.error(errorData.error);
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error('An unexpected error occurred');
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Todo</CardTitle>
                <CardDescription>Create a new todo in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Title of your todo"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Description of your todo"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </CardFooter>
        </Card>
    )
}
