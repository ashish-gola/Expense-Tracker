import User from "./user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createToken = async (user) => {
    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await createToken(user);
        const isProduction = process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'prod';
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: isProduction,
            httpOnly: true,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/'
        };

        if (isProduction && process.env.PROD_DOMAIN) {
            cookieOptions.domain = process.env.PROD_DOMAIN;
        }

        res.cookie("authToken", token, cookieOptions);
        res.status(200).json({ message: "Login successful" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
