import express from "express";
import cors from "cors";
import prisma from "./config/prisma";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error obteniendo productos",
    });
  }
});

// Obtener un producto por ID
app.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error obteniendo producto",
    });
  }
});

// Crear producto
app.post("/products", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creando producto",
    });
  }
});

// Actualizar producto
app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, price, image } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price: Number(price),
        image,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error actualizando producto",
    });
  }
});

// Eliminar producto
app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error eliminando producto",
    });
  }
});
app.post("/orders", async (req, res) => {
  try {
    const {
  customer,
  email,
  address,
  city,
  cart,
  total,
} = req.body;

    const order = await prisma.order.create({
      data: {
        customer,
  email,
  address,
  city,
  total,

        items: {
          create: cart.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creando pedido",
    });
  }
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error obteniendo pedidos",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});