import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const daoProductos = new productDao()

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await daoProductos.getAllProducts()
        console.log(products);
        res.render("index", {
            products
        });
    } catch (error) {
        console.log(error)
    }
});

export default viewsRouter;