"use client";

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import { caller } from "@/app/server/index";
import { toDoSchema } from "@/app/lib/definitions";
import type { ZodError } from "zod";
import type { ZodIssue } from "zod";
import { SignOut } from "@/app/_components/Sign-Out";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof caller)["getTodos"]>>;
}) {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const validateTodo = async (formData: FormData) => {
    const validatedFields = toDoSchema.safeParse(formData.get("content"));

    if (!validatedFields.success) {
      setError(validatedFields.error);
      return;
    }

    addTodo.mutate(validatedFields.data);
    setContent("");
    setError(undefined);
  };

  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<ZodError | undefined>(undefined);
  return (
    <div>
      <div>
        <label htmlFor="content">Content</label>
        <div>{JSON.stringify(getTodos.data)}</div>
        <form action={validateTodo}>
          <input
            id="content"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-black"
          />
          <button type="submit">Add Todo</button>
        </form>
        {error && (
          <div>
            {error.issues.map((elem: ZodIssue) => (
              <p key={elem.code}>{elem.message}</p>
            ))}
          </div>
        )}
        <SignOut />
      </div>
    </div>
  );
}
