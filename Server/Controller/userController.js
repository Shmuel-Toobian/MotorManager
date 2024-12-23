const userSchema = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await userSchema.findOne({ email: email });

    if (!name || !password || !email) {
      return res
        .status(409)
        .json({ message: "Name and password and email is requierd" });
    }

    if (findUser) {
      const chekPassword = await bcrypt.compare(password, findUser.password);
      if (!chekPassword) {
        return res
          .status(404)
          .json({ message: "User already exists with this email go Login" });
      }

      return res.status(409).json({ message: "User already exists go Login" });
    }
    const newUser = new userSchema({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userSchema.findOne({ email: email });

    if (!password || !email) {
      return res
        .status(409)
        .json({ message: "Password and email is requierd" });
    }
    if (!findUser) {
      return res.status(404).json({ message: "Email or password invalid" });
    }
    const chekPassword = await bcrypt.compare(password, findUser.password);

    if (!chekPassword) {
      return res.status(404).json({ message: "Email or password invalid" });
    }

    const token = jwt.sign({ id: findUser._id }, secretKey, {
      expiresIn: "30d",
    });
    res.cookie("token", "Bearer " + token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    const user = findUser.toObject(); // ממיר את המסמך לאובייקט רגיל
    delete user.password; // מסיר את השדה password
    res.status(201).json({ message: "welcome " + findUser.name, user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

exports.deleteCookie = async(req, res)=>{

  try {
    res.clearCookie('token', { 
      httpOnly: true,
      secure: true,
      path:'/'
      
    })
    res.json({message: 'cookie deleted'})
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }

}
