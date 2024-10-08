import clientPromise from "./mongodb"

export async function findUserByEmail(email: string) {
  const client = await clientPromise
  const db = client.db("Next_Ecommerce")
  const user = await db.collection("users").findOne({ email })
  return user
}