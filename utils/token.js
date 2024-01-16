import jwt from "jsonwebtoken";

export const sendToken = (res, message, data) => {
  const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({ sucess: true, message, user: data, token });
};
