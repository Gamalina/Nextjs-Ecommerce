import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

const handler = nextConnect();

handler.post(async (req, res) => {
  const { email, password } = req.body;

  await connectToDatabase();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
});

export default handler;
