const express = require("express")
const router = express.Router()

const userRouter = require("./userRouter")
const { login,createUser } = require("../controller/UserController")

router.use("/user",userRouter)
// router.post("/signup",upload.single('profile_image'),signup)
router.post("/auth/signin",login)
router.post("/auth/signup",createUser)


  

module.exports = router     
