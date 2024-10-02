import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    
    if (!isMatch)
      return res.status(400).json({ message: "Password Incorrecto" });
    
    jwt.sign({ id: userFound._id, username: userFound.username }, SECRET_KEY, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error al generar token" });
      }
      res.cookie("myToken", token);
      res.json({ message: "Sesion iniciada", token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: passwordHash });

    const userSaved = await newUser.save();

    jwt.sign({ id: userSaved._id }, SECRET_KEY, (err, token) => {
      if (err) console.log(err);
      res.cookie("token", token);
      res.json({ message: "Usuario creado" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const authControllers = {
  login,
  register
};
