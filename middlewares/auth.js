const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        
        if (!token) {
            return res.status(400).json({ message: "Token required" });
        }

        const secretKey = "85154523154";
        const actualToken = token.split(" ")[1];

        if (!actualToken) {
            return res.status(400).json({ message: "Invalid token format" });
        }

        const result = jwt.verify(actualToken, secretKey);

        if (!result) {
            return res.status(400).json({ message: "Invalid token" });
        }

        req.user = result; // store decoded token data
        next(); // proceed to the next middleware
    } catch (e) {
        console.error("Auth error:", e.message);
        res.status(500).json({ message: "Authentication failed" });
    }
};

module.exports = auth;
