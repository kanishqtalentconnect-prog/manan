import jwt from "jsonwebtoken";

const generateToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateToken;
