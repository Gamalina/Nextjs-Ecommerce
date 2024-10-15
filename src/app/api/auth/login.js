import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { mongooseConnect } from '../lib/mongoose';
import User from '../models/User';

export default async function login(req, res) {
    const { email, password } = req.body;

    await mongooseConnect();

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
    res.status(200).json({ message: 'Login successful' });
}