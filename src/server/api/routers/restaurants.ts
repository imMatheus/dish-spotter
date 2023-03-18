import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Restaurant } from "~/models/Restaurant";
import { isValidObjectId } from "mongoose";
import { Review } from "~/models/Review";

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
      console.log("deelting");

      await Restaurant.deleteMany({
        rating: { $gt: 1, $lt: 4 },
      });

      console.log("done deleting");

      return Restaurant.find({
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [input.coordinates],
            },
          },
        },
      })
        .sort({ rating: "desc" })
        .limit(30);
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        if (!isValidObjectId(input.id)) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Could not find the given restaurant",
          });
        }

        const restaurant = await Restaurant.findById(input.id).lean();

        if (!restaurant) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Could not find the given restaurant",
          });
        }

        const reviews = await Review.find({ restaurant: input.id })
          .limit(10)
          .lean();

        return { ...restaurant, reviews };
      } catch (error) {
        return null;
      }
    }),
});

// const result = await Review.aggregate([
//   { $match: { restaurant: input.id } },
//   { $sort: { _id: -1 } },
//   { $limit: 5 },
//   {
//     $lookup: {
//       from: "restaurants",
//       localField: "restaurant",
//       foreignField: "_id",
//       as: "restaurant",
//     },
//   },
//   { $unwind: "$restaurant" },
// ]);
// console.log(result);

// await Review.create({
//   body: faker.lorem.sentence(25),
//   images: [
//     `https://avatars.githubusercontent.com/u/4004?v=4`,
//     `https://avatars.githubusercontent.com/u/3004?v=4`,
//   ],
//   rating: 3.4,
//   restaurant: input.id,
//   user: {
//     id: "64035d311a7406a12f13e034",
//     name: "Matheus",
//     image: "https://avatars.githubusercontent.com/u/77362975?v=4",
//   },
// });
