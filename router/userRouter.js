const express = require("express")
const { createUser,allUser } = require("../controller/UserController")
const AuthenticateToken = require("../middlewere/JWT")

const router = express.Router()




router.get("/all",AuthenticateToken,allUser)


module.exports = router