import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import clientPromise from '../lib/mongodb'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const client = await clientPromise
    const db = client.db("Next_Ecommerce")
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    })

    const newUser = await db.collection("users").findOne({ _id: result.insertedId })

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 })
  }
}