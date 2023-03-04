import { z } from "zod";

import { swamp, faker } from "fongus";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Restaurant } from "~/models/Restaurant";

export const restaurantsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        coordinates: z.tuple([
          z.tuple([z.number(), z.number()]),
          z.tuple([z.number(), z.number()]),
          z.tuple([z.number(), z.number()]),
          z.tuple([z.number(), z.number()]),
          z.tuple([z.number(), z.number()]),
        ]),
      })
    )
    .query(async ({ input }) => {
      // await Restaurant.deleteMany();
      for (let j = 0; j < 0; j++) {
        console.log("j: ", j);

        const arr: any[] = [];
        for (let i = 0; i < 15000; i++) {
          arr.push({
            name: faker.name.fullName(),
            images: Array(12)
              .fill("")
              .map(
                () =>
                  `https://avatars.githubusercontent.com/u/${Math.floor(
                    Math.random() * 1000000
                  )}?v=4`
              ),
            address: {
              street: faker.address.street(),
              city: faker.address.city(),
              country: faker.address.country(),
            },
            location: {
              type: "Point",
              coordinates: [
                faker.address.longitude(180, -180),
                faker.address.latitude(90, -90),
              ],
            },
            rating: (Math.random() * 5).toFixed(2),
            numberOfReviews: Math.floor(Math.random() * 200) + 3,
          });
        }

        console.log("inserting all docs");

        await Restaurant.insertMany(arr);
        console.log("done");
      }

      console.log(input.coordinates);

      return Restaurant.find({
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [input.coordinates],
            },
          },
        },
      }).limit(30);
    }),
});
