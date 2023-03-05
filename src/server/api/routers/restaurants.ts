import { z } from "zod";

import { faker } from "fongus";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
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
      // await Restaurant.deleteMany({ rating: { $gt: 2.5 } });
      for (let j = 0; j < 0; j++) {
        console.log("j: ", j);

        const arr: any[] = [];
        for (let i = 0; i < 1; i++) {
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
            menu: {
              sections: [
                {
                  name: "Hot meals",
                  items: Array(8)
                    .fill("")
                    .map(() => ({
                      name: faker.lorem.words(),
                      description: faker.lorem.paragraph(),
                      price: parseFloat((Math.random() * 200 + 10).toFixed(1)),
                    })),
                },
                {
                  name: "Wines",
                  items: Array(5)
                    .fill("")
                    .map(() => ({
                      name: faker.lorem.words(),
                      description: faker.lorem.paragraph(),
                      price: parseFloat((Math.random() * 200 + 10).toFixed(1)),
                    })),
                },
              ],
            },
          });
        }

        console.log("inserting all docs");

        const res = await Restaurant.insertMany(arr);
        console.log("done");
        console.log(res);
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

        console.log("waag1");
        console.log(input);

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

        console.log(restaurant);
        console.log(reviews);

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
