import { createTRPCRouter } from "~/server/api/trpc";
import { restaurantsRouter } from "~/server/api/routers/restaurants";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  restaurants: restaurantsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
