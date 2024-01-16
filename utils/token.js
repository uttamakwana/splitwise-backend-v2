import jwt from "jsonwebtoken";

export const sendToken = (res, message, data) => {
  const token = jwt.sign({ id: data._id }, "dfasdfasdfasdfa", {
    expiresIn: "7d",
  });

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, message, user: data, token });
};
