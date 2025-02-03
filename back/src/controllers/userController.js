import user from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { isGoodPassword } from "../utils/validators.js";

// CREATE USER
export const createUser = async (req, res) => {
    try {
      const userData = new user(req.body);
      const { email } = userData;

      const userExist = await user.findOne({ email }); 
      if (userExist) {
        return res.status(400).json({ message: `User with user email ${email} already exists` });
      }

      // Si el usuario no existe, se guarda en la db
      const savedUser = await userData.save();
      // 201, porque se creo un nuevo usuario.
      return res.status(201).json({ message: "User created", data : { savedUser } });;
    } 
    catch (error) {
      const validationErrors = {};
      if (error.errors) {   // Error.errors es el objeto que me aparece al hacer el console.error(error).
        // Chequea si el error es en la pass
        if (error.errors.password) {
            validationErrors.password = error.errors.password.message;
        }
        // O si es en el email
        if (error.errors.email) {
            validationErrors.email = error.errors.email.message;
        }
        // O también si está en el profile elegido (si no elige nada, se guarda como "user" por defecto)
        if (error.errors.profile) {
            validationErrors.profile = error.errors.profile.message;
        }
      }
      console.error({ Error: validationErrors });
      return res.status(400).json({ Error: validationErrors });
    }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const users = await user.find()
    // Controla la longitud (chequea que haya datos)
    if (users.length === 0) {
        // 204: No content: No hay contenido. 
        return res.status(204).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } 
  catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    // Se obtiene por path param el id (api/user/delete/id)
    const _id = req.params.id;
    const userExists = await user.findOne({ _id });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.findByIdAndDelete( _id );
    res.status(200).json({ message: "User deleted successfully" });
  } 
  catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message || error });
  }
} 

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const { password } = req.body;
    const userExists = await user.findOne({ _id });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      if (!isGoodPassword(password)) {
      return res.status(400).json({ message: "Password is not valid" });
      }
      //Hashea la contraseña modificada
      const hashedPassword = await bcryptjs.hash(password, 10);
      req.body.password = hashedPassword;
    }

    const updatedUser = await user.findByIdAndUpdate( {_id}, req.body, { new: true }); // Para que "findByIdAndUpdate" devuelva el documento actualizado, en lugar del documento original.
    console.log('User updated successfully', updatedUser);
    return res.status(201).json({message: 'User updated successfully', data: {updatedUser}});

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const userExists = await user.findById({ _id });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// VALIDATE USER (LOGIN)
export const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await user.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    //Comparar password que llega del body contra la guardada en la db
    const passwordMatches = await bcryptjs.compare(password, userFound.password)
    
    if (passwordMatches) {
      // Si la password es correcta: 
      const payload = {
        userId: userFound._id,
        userEmail: userFound.email
      }
      const token = jwt.sign(payload, SECRET, { expiresIn: "30m" }); // Token firmado para que sea único y seguro.
      req.session.token = token; // Se guarda en la sesión del servidor
      console.log('Generated token:', token);
      const profile = userFound.profile;

      return res.status(200).json({message: "Logged in", token, profile: profile }); // La respuesta se envía al cliente (al front).
    } else {
      res.status(401).json({ message: "Username or password is incorrect. Try again." });
    }
  }
  catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error", error: error.stack });
  }
}
