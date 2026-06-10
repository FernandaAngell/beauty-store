import prisma from "./config/prisma";

async function main() {
  const product = await prisma.product.create({
    data: {
      name: "iPhone 16",
      price: 4999000,
      image: "https://picsum.photos/400"
    }
  });

  console.log(product);
}

main();