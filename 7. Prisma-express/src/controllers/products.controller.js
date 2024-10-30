import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {
    addProduct = async (req,  res) => {
        try {
            const { product_name, price, stock_quantity } = req.body;

            const newProduct = await prisma.products.create({
                data: {
                    product_name,
                    price: price,
                    stock_quantity: stock_quantity
                }
            })
            res.status(201).send(newProduct);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export const productController = new ProductController();