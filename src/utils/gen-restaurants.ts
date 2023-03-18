import { faker } from "fongus";
import { Restaurant } from "~/models/Restaurant";

export async function genRestaurants(a = 0, b = 0) {
  console.time("sert");
  for (let j = 0; j < a; j++) {
    console.log("j: ", j);
    const tags = [
      "halal",
      "sushi",
      "kebab",
      "kosher",
      "hamburger",
      "pizza",
      "mexican",
      "high_class",
    ];

    const arr: any[] = [];
    for (let i = 0; i < b; i++) {
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
        tags: [
          ...new Set(
            Array(Math.floor(Math.random() * tags.length) + 1)
              .fill(null)
              .map(() => tags[Math.floor(Math.random() * tags.length)])
          ),
        ],
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
    // console.table(res.map((r: any) => [r.location.coordinates]));
  }
  console.timeEnd("sert");
}
