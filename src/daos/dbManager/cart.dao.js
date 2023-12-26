import {cartModel} from "../../models/cart.model.js"

class CartDao {
    async getAllCarts(){
        return await cartModel.find()
    }

    async createCart(){
        return await cartModel.create({})
    }

}

export default new CartDao()