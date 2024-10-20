"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import TodoForm from "./TodoForm"

export default function TodoFormManager() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleOpenForm = () => setIsFormOpen(true)
    const handleCloseForm = () => setIsFormOpen(false)

    return (
        <div className="flex justify-center items-center h-screen">
            {isFormOpen ? (
                <TodoForm onClose={handleCloseForm} />
            ) : (
                <Button onClick={handleOpenForm}>Create New Todo</Button>
            )}
        </div>
    )
}
