import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/app/server/index";
import { createContext } from "@/app/server/context";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
}

export { handler as GET, handler as POST };
