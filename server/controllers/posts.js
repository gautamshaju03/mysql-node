const models = require("../models");
const Validator=require("fastest-validator")
function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
        userId: 1
    };
    const schema={
        title:{
            type:"string",
            optional:false,
            max:"100"
        },
        content:{
            type:"string",
            optional:false,
            max:"500"
        },
        categoryId:{
            type:"number",
            optional:false
        }
    }
    const v=new Validator();
    const validationResponse=v.validate(post,schema);
    if(validationResponse!==true){
        return res.status(400).send({
            message:"Validation falied"
        })
    }

    models.Post.create(post).then(result => {
        res.status(201).send({ message: "Post created successfully", post: result });
    }).catch(error => {
        res.status(500).send({ message: "Something went wrong", error: error });
    });
}

function show(req, res) {
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: "Post not found" });
        }
    }).catch(error => {
        res.status(500).send({ message: "Something went wrong", error: error });
    });
}

function index(req,res){
    models.Post.findAll().then(result=>{
        res.status(200).send({message:"All posts fetched",posts:result})
    }).catch(error=>{
        res.status(500).send({ message: "Something went wrong", error: error });
    })
}

function update(req,res){
    const id=req.params.id;
    const updatedPost={
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
    }
    const userId=1;
    const schema={
        title:{
            type:"string",
            optional:false,
            max:"100"
        },
        content:{
            type:"string",
            optional:false,
            max:"500"
        },
        categoryId:{
            type:"number",
            optional:false
        }
    }
    const v=new Validator();
    const validationResponse=v.validate(updatedPost,schema);
    if(validationResponse!==true){
        return res.status(400).send({
            message:"Validation falied"
        })
    }

    models.Post.update(updatedPost,{where:{id:id,userId:userId}}).then(result=>{
        res.status(200).send({message:"Post updated successfully",post:updatedPost})
    }).catch(error=>{
        res.status(500).send({ message: "Something went wrong", error: error });
    })
}

function destroy(req,res){
    const id=req.params.id;
    const userId=1;
    models.Post.destroy({where:{id:id,userId:userId}}).then(result=>{
        res.status(200).send({message:"Post deleted successfully",post:result})
    }).catch(error=>{
        res.status(500).send({ message: "Something went wrong", error: error });
    })
    
}

module.exports = {
    save: save,
    show: show,
    index:index,
    update:update,
    destroy:destroy
};
