const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({
      where: { email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    } else {
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });
      if (newUser) {
        res.status(201).json({
          message: "Successfully create a user",
          data: newUser,
          statusCode: 201,
        });
      }
    }
  } catch (error) {
    console.log("Error registering user:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ where: { email } });
  

    if (!user) {
      return res.status(400).json({
        msg: "Email does not exist!",
      });
    } else {
      var userData = user.get({ plain: true });
    }


    const isPasswordValid = await bcrypt.compareSync(
      password,
      userData.password
    );

    if (isPasswordValid) {
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      if (accessToken) {
        res.status(200).json({
          data: user,
          accessToken,
          msg: "Successfully log in user",
          statusCode: 200,
        });
      }
    } else {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Oops, an error occurred: ${error}`,
      statusCode: 500,
    });
    next(error);
  }
};

exports.allUser = async (req, res, next) => {
  try {
    const allUser = await User.findAll({});

    if (allUser) {
      res.status(200).json({
        msg: `Succesfully retrive All user`,
        data: allUser,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        msg: `Failed retrived all user`,
        statusCode: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Oops, an error occurred: ${error}`,
      statusCode: 500,
    });
    next(error);
  }
};
