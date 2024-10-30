import { pool } from "../config/postgres.js";

class UserController {
    getUserProducts = async (req, res) => {
        try {
            const { id } = req.params;

            const findUserQuery = `SELECT * FROM "users" WHERE user_id = ${id}`;
            const userFound = await pool.query(findUserQuery);
            
            if (!userFound.rows[0]) return res.status(500).send('User Not Found');

            const getProductQuery = `
            SELECT u.username, o.order_id, p.product_name, p.price, oi.quantity FROM "products" AS p
            JOIN "order_items" AS oi ON p.product_id = oi.product_id
            JOIN "orders" AS o ON oi.order_id = o.order_id
            JOIN "users" AS u ON o.user_id = u.user_id
            WHERE u.user_id = ${id}`

            const productQuery = await pool.query(getProductQuery);

            res.status(200).send(productQuery.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
}

export const userController = new UserController();