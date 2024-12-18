import TodoList from "@/app/_components/TodoList";
import { caller } from "@/app/server/index";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function makeTodo() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const todos = await caller.getTodos();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <TodoList initialTodos={todos} />
      </main>
    </div>
  );
}
