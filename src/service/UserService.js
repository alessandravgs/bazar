import User from "../model/User.js";
import Verify from "../helpers/verifyFields.js";
import bcrypt from "bcrypt";

export default class UserService{

    static async register(name, email, password, confirmpassword, phone, address){

        Verify.verifyFieldIsNull(name, "O nome é obrigatório.", 422);
        Verify.verifyFieldIsNull(email, "O email é obrigatório.", 422);
        Verify.verifyFieldIsNull(password, "A senha é obrigatória.", 422);
        Verify.verifyFieldIsNull(phone, "O telefone é obrigatório.", 422);
        Verify.verifyFieldIsNull(address, "O endereço é obrigatório.", 422);
        Verify.verifyFieldIsNull(confirmpassword, "Obrigatório confirmar a senha.", 422);

        if(password !== confirmpassword)
            Verify.buildError("A senha e a confirmação são diferentes", 422);

        const userExists = await User.findOne({email});

        Verify.verifyFieldIsNotNull(userExists, "Por favor utilize outro email esse já existe.", 422);

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({name, email, password:passwordHash,
            address, phone
        });
        const userSaved = await user.save();

        return userSaved;
    }

    static async verifyLogin(email, password){

        Verify.verifyFieldIsNull(email, "O email é obrigatório.", 422);
        Verify.verifyFieldIsNull(password, "A senha é obrigatória.", 422);

       const user = await User.findOne({email});
       Verify.verifyFieldIsNull(user, "Login ou senha inválidos.", 401);

       const isPasswordHash = await bcrypt.compare(password, user.password);
       Verify.verifyFieldIsNull(isPasswordHash, "Login ou senha inválidos.", 401);

       return user;
    }

    static async getUser(req){
        const user = await User.findById(req.user.userId).select("-password");
        Verify.verifyFieldIsNull(user, "Token inválido.", 401);
        return user;
    }

    static async getInfoOwner(id){
        const user = await User.findById(id).select("name phone");
        return user;
    }

    static async updateUser(req, name, email, password, confirmpassword, phone, address){

        const user = await this.getUser(req);
        Verify.verifyFieldIsNull(user, "Usuário não encontrado.", 401);

        Verify.verifyFieldIsNull(name, "O nome é obrigatório.", 422);
        Verify.verifyFieldIsNull(email, "O email é obrigatório.", 422);
        Verify.verifyFieldIsNull(password, "A senha é obrigatória.", 422);
        Verify.verifyFieldIsNull(phone, "O telefone é obrigatório.", 422);
        Verify.verifyFieldIsNull(address, "O endereço é obrigatório.", 422);
        Verify.verifyFieldIsNull(confirmpassword, "Obrigatório confirmar a senha.", 422);

        if(req.file)
            user.image = req.file.filename;

        user.name = name;
        user.email = email;
        user.password = password;
        user.confirmpassword = confirmpassword;
        user.phone = phone;
        user.address = address;

        const userUpdated = await User.findByIdAndUpdate(user._id, user, {new: true});
        return userUpdated;
    }

}