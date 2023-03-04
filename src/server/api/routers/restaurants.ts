import { z } from "zod";

import { swamp, faker } from "fongus";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Restaurant } from "~/models/Restaurant";

export const restaurantsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    for (let i = 0; i < 0; i++) {
      await Restaurant.create({
        name: faker.name.fullName(),
        address: {
          street: faker.address.street(),
          city: faker.address.city(),
          country: faker.address.country(),
          long: faker.address.longitude(),
          lat: faker.address.latitude(),
        },
        rating: (Math.random() * 5).toFixed(2),
        numberOfReviews: Math.floor(Math.random() * 200) + 3,
      });
    }

    return Restaurant.find();
  }),
});
