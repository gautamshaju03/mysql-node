const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword
        };

        const result = await models.User.create(user);

        res.status(201).send({ message: "User created successfully", user: result });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

function login(req,res){
    models.User.findOne({where:{email:req.body.email}}).then(user=>{
        if(user===null){
            res.status(401).json({message:"Invalid credentials",})
        }
        else{
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(result){
                    const token=jwt.sign({
                        email:user.email,
                        userId:user.id
                    },"secret",function(err,token){
                        res.status(200).send({message:"authentication successful",token:token});
                    })
                }
                else{
                    res.status(401).json({message:"Invalid credentials",})
                }
            })
        }
    })
}

module.exports = {
    signUp: signUp,
    login:login
};
