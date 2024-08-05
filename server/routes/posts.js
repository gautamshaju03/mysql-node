const express=require("express");
const posts = require("../controllers/posts");
const checkAuth=require("../middleware/auth")



const router =express.Router();

router.post("/",checkAuth.checkAuth,posts.save);
router.get("/:id",checkAuth.checkAuth,posts.show);
router.get("/",checkAuth.checkAuth,posts.index);
router.patch("/:id",checkAuth.checkAuth,posts.update)
router.delete("/:id",checkAuth.checkAuth,posts.destroy)
module.exports=router;