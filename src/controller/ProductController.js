import ProductService from "../service/ProductService.js";
import UserService from "../service/UserService.js";


export default class ProductController {

    static async index(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await ProductService.index(page, limit);
            res.status(200).json({ products });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    static async createProduct(req, res) {
        try {
            const { name, description, state, purchased_at } = req.body;
            const product = await ProductService.createProduct(req, name, description, state, purchased_at);
            res.status(201).json({ product });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }   
    }

    static async show(req, res){
        try{
            const { id } = req.params;
            const product = await ProductService.getProduct(id);
            res.status(200).json({product});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async showUserProducts(req, res){
        try{
            const user = await UserService.getUser(req); 
            const products = await ProductService.getProductsByOwner(user.id);
            res.status(200).json({products});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async showRecieverProducts(req, res){
        try{
            const user = await UserService.getUser(req); 
            const products = await ProductService.getProductsByReciever(user.id);
            res.status(200).json({products});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async updateProduct(req, res){
        try{
            const { id } = req.params;
            const { name, description, state, purchased_at, reciever } = req.body;
            const updatedProduct = await ProductService.updateProduct(req, id, name, description, state, purchased_at, reciever);
            res.status(200).json(updatedProduct);
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async deleteProduct(req, res){
        try{
            const { id } = req.params;
            await ProductService.deleteProduct(id);
            res.status(204).send();
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async schedule(req, res){
        try{
            const { id } = req.params;
            const message = await ProductService.schedule(req, id);
            res.status(200).json({message: message});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    static async concludeDonation(req, res){
        try{
            const { id } = req.params;
            const message = await ProductService.concludeDonation(req, id);
            res.status(200).json({message: message});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }
}