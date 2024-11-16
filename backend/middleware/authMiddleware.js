const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log({token: req.get("Authorization")});
  
  const token = req.get("Authorization");
  
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};



const adminAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  next(); 
};


module.exports = { auth, adminAuth };