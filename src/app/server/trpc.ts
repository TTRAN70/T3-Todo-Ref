import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "@/app/server/context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
    },
  });
});
export const createCaller = t.createCallerFactory;
