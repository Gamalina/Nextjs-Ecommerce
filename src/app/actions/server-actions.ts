import {cookies} from "next/headers"

export async function login(formData : FormData) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  
    const email = formData.get('email') as string
    const password = formData.get('password')
  
    if (email === 'user@example.com' && password === 'password')
    {
      cookies().set('auth', 'logged-in', {secure: true, httpOnly: true})
      return {success: true, message: 'login succesful'}
    }
    else {
      return {success: false, message: 'Invaild email or password'}
    }
  }