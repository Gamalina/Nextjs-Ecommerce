import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    console.log('Invalid credentials at !user');
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    console.log('Invalid credentials at isPasswordCorrect');
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
  }

  if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET is not defined');
    return NextResponse.json({ message: 'JWT_SECRET is not defined' }, { status: 500 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token }, { status: 200 });
}