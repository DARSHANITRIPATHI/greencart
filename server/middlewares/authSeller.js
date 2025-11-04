import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  try {
    const token = req.cookies.sellertoken; // ✅ correct cookie name
    if (!token) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ✅ if you have only one admin
    if (decoded.email === process.env.SELLER_EMAIL) {
      req.seller = decoded;
      next();
    } else {
      return res.json({ success: false, message: "Invalid Admin" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authSeller;
