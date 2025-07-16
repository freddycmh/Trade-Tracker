import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("📥 AUTH HEADER RECEIVED:", authHeader); // 👈 Add this

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No or invalid token format");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log("✅ Token verified for user:", decoded.id);
    next();
  } catch (err) {
    console.log("❌ Token verification failed");
    res.status(403).json({ message: "Invalid token" });
  }
};