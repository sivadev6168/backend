import jwt from "jsonwebtoken";

//test change

const checkToken = (role) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      if (!token) {
        return res.status(403).json({ message: "you are not authorized" });
      }
      //Below line this is used to take the original token sent from bearer
      const ogToken = token.split(" ")[1];
      const isValid = jwt.verify(ogToken, process.env.SECRET_KEY);
      console.log(isValid);
      if (!role.includes(isValid.role)) {
        return res.status(403).json({ message: "you are not authorized" });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: "you are not authorized" }, e);
    }
  };
};

export default checkToken;
