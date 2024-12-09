import 'server-only'
import { cookies } from 'next/headers'

export async function getAuthHeaders(): Promise<{ authorization: string } | {}> {
  const cookieStore = await cookies()
  const token = cookieStore.get('_medusa_jwt')?.value

  if (token) {
    return { authorization: `Bearer ${token}` }
  }

  return {}
}

export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('_medusa_jwt', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('_medusa_jwt', '', {
    maxAge: 0,
  })
}

export async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('_medusa_cart_id')?.value
}

export async function setCartId(cartId: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('_medusa_cart_id', cartId, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function removeCartId(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('_medusa_cart_id', '', { maxAge: 0 })
}

