import {Router} from 'express'
import CartDao from '../daos/dbManager/cart.dao.js'

const cartRouter = Router()


cartRouter.get('/',async (req,res)=>{
    try{
        res.send( await CartDao.getAllCarts())
    }catch(err){
        res.status(500).json({error:err})
    }
        
})



cartRouter.post('/',async (req,res)=>{
    try{
        res.send( await CartDao.createCart())
    }catch(err){
        res.status(500).json({error:err})
    }
    
})






export default cartRouter