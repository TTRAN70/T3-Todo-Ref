import { User } from "@/app/types";
import { publicProcedure, router, createCaller } from "@/app/server/trpc";
import { z } from "zod";
import { todos } from "@/app/db/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { toDoSchema } from "@/app/lib/definitions";
import { createContext } from "@/app/server/context";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    const user: User = { id: "1", name: "John" };
    return user;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return input;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return input.name;
    }),
  getTodos: publicProcedure.query(async () => {
    return db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(toDoSchema).mutation(async (opt) => {
    db.insert(todos).values({ content: opt.input, done: 0 }).run();
    return true;
  }),
});

const makeCall = createCaller(appRouter);
export const caller = makeCall(createContext);

export type AppRouter = typeof appRouter;
