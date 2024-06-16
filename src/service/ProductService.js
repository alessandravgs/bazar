import Product from "../model/Product.js";
import Verify from "../helpers/verifyFields.js";
import UserService from "../service/UserService.js";

export default class ProductService{

    static async getProduct(id){

        Verify.verifyFieldIdIsValid(id);
        
        const product = await Product.findById(id);

        Verify.verifyFieldIsNull(product, "Produto não encontrado.", 404);

        return product;
    }

    static async index(page, limit) {
        const products = await Product.find()
            .sort("-createdAt")
            .limit(limit)
            .skip((page - 1) * limit)
            .populate({ path: "owner", select: "-password" })
            .populate("reciever");

        return products;
    }

    static async getProductsByOwner (ownerId){

        const products = await Product.find({ owner: ownerId });

        Verify.verifyFieldIsNull(products, "Nenhum produto encontrado para este usuário.", 404);
        Verify.verifyFieldIsEmpty(products, "Nenhum produto encontrado para este usuário.", 404);

        return products;
    }

    static async getProductsByReciever (recieverId){

        const products = await Product.find({ reciever: recieverId });

        Verify.verifyFieldIsNull(products, "Nenhum produto encontrado para este usuário.", 404);
        Verify.verifyFieldIsEmpty(products, "Nenhum produto encontrado para este usuário.", 404);

        return products;
    }

    static async createProduct(req, name, description, state, purchased_at){
        const user = await UserService.getUser(req);

        let images = [];
        if (req.files) {
            images = req.files;
        }

        const available = true;

        Verify.verifyFieldIsNull(name, "O nome é obrigatório.", 422);
        Verify.verifyFieldIsNull(description, "A descrição é obrigatória.", 422);
        Verify.verifyFieldIsNull(state, "O estado é obrigatório.", 422);
        Verify.verifyFieldIsNull(purchased_at, "A data de compra é obrigatória.", 422);
        Verify.verifyFieldIsEmpty(images, "A imagem é obrigatória.", 422);

        const product = new Product({name, description, state, owner: user._id, available, images: []});
        images.map((image) => product.images.push(image.filename));
        const productSaved = await product.save();

        return productSaved;
    }

    static async updateProduct(req, id, name, description, state, purchased_at){

        Verify.verifyFieldIdIsValid(id);
        
        let images = [];
        if (req.files) {
            images = req.files;
        }

        Verify.verifyFieldIsNull(name, "O nome é obrigatório.", 422);
        Verify.verifyFieldIsNull(description, "A descrição é obrigatória.", 422);
        Verify.verifyFieldIsNull(state, "O estado é obrigatório.", 422);
        Verify.verifyFieldIsNull(purchased_at, "A data de compra é obrigatória.", 422);
        Verify.verifyFieldIsEmpty(images, "A imagem é obrigatória.", 422);

        const product = await Product.findById(id);
        Verify.verifyFieldIsNull(product, "Não encontrado produto com este ID.", 404);
        
        product.name = name;
        product.description = description;
        product.state = state;
        product.purchased_at = purchased_at;
        images.map((image) => product.images.push(image.filename));

        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new:true});

        return updatedProduct;
    }

    static async deleteProduct(id){

        const product = await this.getProduct(id);
        await Product.findByIdAndDelete(product._id);
    }

    static async schedule(req, id){
        const product = await this.getProduct(id);

        if(!product.available)
            Verify.buildError("Produto não disponível.", 404);

        const user = await UserService.getUser(req);

        if(product.owner.equals(user._id))
            Verify.buildError("Você é o proprietário deste produto.", 400);

        product.reciever = user._id;
        await product.save();

        var owner = await UserService.getInfoOwner(product.owner);
        return `A visita foi agendada com Sucesso, entre em contato com ${owner.name}, pelo telefone ${owner.phone}`;
    }

    static async concludeDonation(req, id){
        const product = await this.getProduct(id);

        if(!product.available)
            Verify.buildError("Produto não disponível.", 404);

        const user = await UserService.getUser(req);

        if(product.owner.equals(user._id))
            Verify.buildError("Você é o proprietário deste produto.", 400);

        product.available = false;
        product.donated_at = new Date();

        await product.save();

        return `Doação concluída com sucesso.`;
    }

}