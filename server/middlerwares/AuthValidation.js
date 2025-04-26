// 📂 middlewares/validation.js

import * as Yup from "yup";

const signupValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(100).required(),
    // image: Yup.string().required(), // uncomment if needed
  });

  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Bad request", error: error.errors });
  }
};

const loginValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(100).required(),
  });

  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Bad request", error: error.errors });
  }
};

const updateValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().min(3).max(50), // optional
    email: Yup.string().email().required(), // required
  });

  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Bad request", error: error.errors });
  }
};

export { signupValidation, loginValidation, updateValidation };
