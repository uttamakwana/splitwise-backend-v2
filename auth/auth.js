import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  // console.log(req);
  const { token } = req.cookies;
  if (!token) return response(res, 400, { message: "Login first required!" });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  return next();
};
