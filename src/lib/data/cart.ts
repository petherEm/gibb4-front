'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { sdk } from '@lib/config'
import medusaError from '@lib/util/medusa-error'
import { HttpTypes } from '@medusajs/types'
import { omit } from 'lodash'

import { getProductsById } from './products'
import { getRegion } from './regions'

// Updated cookie functions
async function getAuthHeaders(): Promise<{ authorization: string } | {}> {
  const cookieStore = cookies()
  const token = cookieStore.get('_medusa_jwt')?.value

  if (token) {
    return { authorization: `Bearer ${token}` }
  }

  return {}
}

async function getCartId(): Promise<string | undefined> {
  const cookieStore = cookies()
  return cookieStore.get('_medusa_cart_id')?.value
}

async function setCartId(cartId: string): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set('_medusa_cart_id', cartId, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

async function removeCartId(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set('_medusa_cart_id', '', { maxAge: 0 })
}

export async function retrieveCart(): Promise<HttpTypes.StoreCart | null> {
  const cartId = await getCartId()

  if (!cartId) {
    return null
  }

  return await sdk.store.cart
    .retrieve(cartId, {}, { next: { tags: ['cart'] }, ...(await getAuthHeaders()) })
    .then(({ cart }) => cart)
    .catch(() => {
      return null
    })
}

export async function getOrSetCart(countryCode: string): Promise<HttpTypes.StoreCart> {
  let cart = await retrieveCart()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id })
    cart = cartResp.cart
    await setCartId(cart.id)
    revalidateTag('cart')
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(
      cart.id,
      { region_id: region.id },
      {},
      await getAuthHeaders()
    )
    revalidateTag('cart')
  }

  return cart
}

export async function updateCart(data: HttpTypes.StoreUpdateCart): Promise<HttpTypes.StoreCart> {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error('No existing cart found, please create one before updating')
  }

  return sdk.store.cart
    .update(cartId, data, {}, await getAuthHeaders())
    .then(({ cart }) => {
      revalidateTag('cart')
      return cart
    })
    .catch(medusaError)
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}): Promise<void> {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart')
  }

  const cart = await getOrSetCart(countryCode)
  if (!cart) {
    throw new Error('Error retrieving or creating cart')
  }

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      await getAuthHeaders()
    )
    .then(() => {
      revalidateTag('cart')
    })
    .catch(medusaError)
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}): Promise<void> {
  if (!lineId) {
    throw new Error('Missing lineItem ID when updating line item')
  }

  const cartId = await getCartId()
  if (!cartId) {
    throw new Error('Missing cart ID when updating line item')
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, await getAuthHeaders())
    .then(() => {
      revalidateTag('cart')
    })
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string): Promise<void> {
  if (!lineId) {
    throw new Error('Missing lineItem ID when deleting line item')
  }

  const cartId = await getCartId()
  if (!cartId) {
    throw new Error('Missing cart ID when deleting line item')
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, await getAuthHeaders())
    .then(() => {
      revalidateTag('cart')
    })
    .catch(medusaError)
  revalidateTag('cart')
}

export async function enrichLineItems(
  lineItems: HttpTypes.StoreCartLineItem[] | HttpTypes.StoreOrderLineItem[] | null,
  regionId: string
): Promise<HttpTypes.StoreCartLineItem[]> {
  if (!lineItems) return []

  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.product_id!),
    regionId: regionId,
  }

  const products = await getProductsById(queryParams)
  if (!lineItems?.length || !products) {
    return []
  }

  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p: any) => p.id === item.product_id)
    const variant = product?.variants?.find(
      (v: any) => v.id === item.variant_id
    )

    if (!product || !variant) {
      return item
    }

    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, 'variants'),
      },
    }
  }) as HttpTypes.StoreCartLineItem[]

  return enrichedItems
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}): Promise<void> {
  return sdk.store.cart
    .addShippingMethod(
      cartId,
      { option_id: shippingMethodId },
      {},
      await getAuthHeaders()
    )
    .then(() => {
      revalidateTag('cart')
    })
    .catch(medusaError)
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: {
    provider_id: string
    context?: Record<string, unknown>
  }
): Promise<HttpTypes.StorePaymentSession> {
  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, await getAuthHeaders())
    .then((resp) => {
      revalidateTag('cart')
      return resp
    })
    .catch(medusaError)
}

export async function applyPromotions(codes: string[]): Promise<void> {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error('No existing cart found')
  }

  await updateCart({ promo_codes: codes })
    .then(() => {
      revalidateTag('cart')
    })
    .catch(medusaError)
}

export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData
): Promise<string | void> {
  const code = formData.get('code') as string
  try {
    await applyPromotions([code])
  } catch (e: any) {
    return e.message
  }
}

export async function setAddresses(currentState: unknown, formData: FormData): Promise<string | void> {
  try {
    if (!formData) {
      throw new Error('No form data found when setting addresses')
    }
    const cartId = await getCartId()
    if (!cartId) {
      throw new Error('No existing cart found when setting addresses')
    }

    const data: HttpTypes.StoreUpdateCart = {
      shipping_address: {
        first_name: formData.get('shipping_address.first_name') as string,
        last_name: formData.get('shipping_address.last_name') as string,
        address_1: formData.get('shipping_address.address_1') as string,
        address_2: '',
        company: formData.get('shipping_address.company') as string,
        postal_code: formData.get('shipping_address.postal_code') as string,
        city: formData.get('shipping_address.city') as string,
        country_code: formData.get('shipping_address.country_code') as string,
        province: formData.get('shipping_address.province') as string,
        phone: formData.get('shipping_address.phone') as string,
      },
      email: formData.get('email') as string,
    }

    const sameAsShipping = formData.get('same_as_shipping')
    if (sameAsShipping === 'on') data.billing_address = data.shipping_address

    if (sameAsShipping !== 'on')
      data.billing_address = {
        first_name: formData.get('billing_address.first_name') as string,
        last_name: formData.get('billing_address.last_name') as string,
        address_1: formData.get('billing_address.address_1') as string,
        address_2: '',
        company: formData.get('billing_address.company') as string,
        postal_code: formData.get('billing_address.postal_code') as string,
        city: formData.get('billing_address.city') as string,
        country_code: formData.get('billing_address.country_code') as string,
        province: formData.get('billing_address.province') as string,
        phone: formData.get('billing_address.phone') as string,
      }
    await updateCart(data)
  } catch (e: any) {
    return e.message
  }

  redirect(
    `/${formData.get('shipping_address.country_code') as string}/checkout?step=delivery`
  )
}

export async function placeOrder(): Promise<HttpTypes.StoreCart | void> {
  const cartId = await getCartId()
  if (!cartId) {
    throw new Error('No existing cart found when placing an order')
  }

  const cartRes = await sdk.store.cart
    .complete(cartId, {}, await getAuthHeaders())
    .then((cartRes) => {
      revalidateTag('cart')
      return cartRes
    })
    .catch(medusaError)

  if (cartRes?.type === 'order') {
    const countryCode =
      cartRes.order.shipping_address?.country_code?.toLowerCase()
    await removeCartId()
    redirect(`/${countryCode}/order/confirmed/${cartRes?.order.id}`)
  }

  return cartRes.cart
}

export async function updateRegion(countryCode: string, currentPath: string): Promise<void> {
  const cartId = await getCartId()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (cartId) {
    await updateCart({ region_id: region.id })
    revalidateTag('cart')
  }

  revalidateTag('regions')
  revalidateTag('products')

  redirect(`/${countryCode}${currentPath}`)
}

