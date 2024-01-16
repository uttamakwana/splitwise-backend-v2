//* imports
import { User } from "../models/User.js";
import { response } from "../utils/response.js";
import crypto from "crypto";
import { sendToken } from "../utils/token.js";
import bcrypt from "bcrypt";

//* Controllers

//? Description: Get All Users
//? Route: GET /users
//? Public
export const getAllUsers = async (req, res) => {
  const users = await User.find().lean().exec();
  if (!users?.length)
    return response(res, 404, { message: "Users not found!" });
  return response(res, 200, { users });
};

//? Description: Register a new User
//? Route: POST /users
//? Public
export const registerUser = async (req, res) => {
  const { name, number, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return response(res, 402, { message: "email already registered!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, number, email, password: hashedPassword });
  sendToken(res, "Registration successfull!", user);
};

//? Description: Login User
//? Route: POST /users
//? Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean().exec();

  if (!user)
    return response(res, 404, { message: "email or password may be wrong!" });

  const matchPassword = bcrypt.compare(user.password, password);

  if (!matchPassword)
    return response(res, 404, { message: "email or password may be wrong!" });

  sendToken(res, "Login successfull!", user);
};

//? Description: Update an User
//? Route: PATCH /users
//? Public
export const updateUser = async (req, res, next) => {
  const { id, name, number, password } = req.body;
  const user = await User.findById(id);
  if (!user) return response(res, 404, { message: "User not found" });

  if (name) user.name = name;
  if (password) user.password = password;

  await user.save();
  return response(res, 200, { user, message: "Update successful!" });
};

//? Description: Get an User info
//? Route: GET /users
//? Public
export const getUserInfo = async (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://splitwise-expense.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) return response(res, 404, { message: "User not found!" });

  return response(res, 200, { user, message: "User data retrived!" });
};
