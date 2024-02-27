import jwt from "jsonwebtoken";

export const sendToken = (res, message, data) => {
  const secretKey = "defaultSecretKey";
  const token = jwt.sign({ id: data._id }, secretKey, { expiresIn: "7d" });
  console.log(token);

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
    // sameSite: "None",
    // secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, message, user: data, token });
};
