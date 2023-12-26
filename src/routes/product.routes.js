import { Router } from "express"
import productDao from "../daos/dbManager/product.dao.js"

const daoProductos = new productDao()

const productRouter = Router()

productRouter.get("/", async(req, res) => {
    try {
        const products = await daoProductos.getAllProducts()
        res.json({
            data: products,
            message: "Productos Obtenidos"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error,
            message: "Productos No Obtenidos"
        })
    }
})

productRouter.post("/", async(req, res) => {
    try {
        const product = await daoProductos.createProduct(req.body)
        res.json({
            product,
            message: "Producto agregado"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error,
            message: "Producto no agregado"
        })
    }
})

productRouter.put("/:id", async(req, res) => {
    try {
        const { id } = req.params
        const product = await daoProductos.updateProduct(id, req.body)

        res.json({
            product,
            message: "Producto actualizado"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error,
            message: "No se pudo actualizar el producto"
        })
    }
})

productRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await daoProductos.deleteProduct(id)
        res.json({
            product,
            message: "Producto eliminado"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error,
            message: "No se pudo eliminar el producto"
        })
    }
})

export default productRouter