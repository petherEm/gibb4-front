'use client'

import React, {
  startTransition,
  useActionState,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { Spinner } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import Divider from '@components/common/sub-components/divider'
import { Heading } from '@components/common/sub-components/heading'
import { Stepper } from '@components/common/sub-components/stepper'
import { Text } from '@components/common/sub-components/text'
import { initiatePaymentSession, setAddresses } from '@lib/data/cart'
import { useCheckoutForms } from '@lib/hooks/use-checkout-forms'
import compareAddresses from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'

import BillingAddress from '../billing_address'
import ShippingAddress from '../shipping-address'
import { SubmitButton } from '../submit-button'

const getSameAsShipping = (cart) =>
  cart?.shipping_address && cart?.billing_address
    ? compareAddresses(cart.billing_address, cart.shipping_address)
    : true

export default function Component({
  cart = null,
  customer = null,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('step') === 'address'

  const [sameAsShipping, setSameAsShipping] = useState(() =>
    getSameAsShipping(cart)
  )

  const initialValues = useMemo(
    () => ({
      shipping_address: {
        first_name: cart?.shipping_address?.first_name || '',
        last_name: cart?.shipping_address?.last_name || '',
        address_1: cart?.shipping_address?.address_1 || '',
        company: cart?.shipping_address?.company || '',
        postal_code: cart?.shipping_address?.postal_code || '',
        city: cart?.shipping_address?.city || '',
        country_code:
          params.countryCode || cart?.shipping_address?.country_code || '',
        province: cart?.shipping_address?.province || '',
        phone: cart?.shipping_address?.phone || '',
      },
      billing_address: {
        first_name: cart?.billing_address?.first_name || '',
        last_name: cart?.billing_address?.last_name || '',
        address_1: cart?.billing_address?.address_1 || '',
        company: cart?.billing_address?.company || '',
        postal_code: cart?.billing_address?.postal_code || '',
        city: cart?.billing_address?.city || '',
        country_code:
          cart?.billing_address?.country_code ||
          cart?.shipping_address?.country_code ||
          '',
        province: cart?.billing_address?.province || '',
        phone: cart?.billing_address?.phone || '',
      },
      email: cart?.email || customer?.email || '',
      same_as_shipping: sameAsShipping,
    }),
    [cart, customer, params.countryCode]
  )

  const checkout = useCheckoutForms(initialValues)
  const [actionState, formAction] = useActionState(setAddresses, null)

  const handleEdit = useCallback(() => {
    router.push(pathname + '?step=address')
  }, [pathname, router])

  const toggleSameAsShipping = useCallback(() => {
    setSameAsShipping((prev) => !prev)
    checkout.setFieldValue('same_as_shipping', !sameAsShipping)
  }, [sameAsShipping, checkout])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        await checkout.handleSubmit()

        if (Object.keys(checkout.errors).length === 0) {
          const formData = new FormData()

          const currentValues = checkout.values

          Object.entries(currentValues.shipping_address).forEach(
            ([key, value]) => {
              formData.append(`shipping_address.${key}`, value as string)
            }
          )

          Object.entries(currentValues.billing_address).forEach(
            ([key, value]) => {
              formData.append(`billing_address.${key}`, value as string)
            }
          )

          formData.append('email', currentValues.email)
          formData.append(
            'same_as_shipping',
            currentValues.same_as_shipping ? 'on' : 'off'
          )

          startTransition(() => {
            formAction(formData)
          })
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    [checkout, formAction]
  )

  React.useEffect(() => {
    if (actionState && !actionState.pending) {
      if (actionState.error) {
        console.error('Error setting addresses:', actionState.error)
      } else {
        const activeSession = cart?.payment_collection?.payment_sessions?.find(
          (paymentSession: any) => paymentSession.status === 'pending'
        )

        if (activeSession) {
          initiatePaymentSession(cart, {
            provider_id: activeSession.provider_id,
          }).then(() => {
            router.push(pathname + '?step=delivery')
          })
        } else {
          router.push(pathname + '?step=delivery')
        }
      }
    }
  }, [actionState, cart, router, pathname])

  if (!cart) {
    return (
      <Box className="bg-primary p-5">
        <Spinner />
      </Box>
    )
  }

  return (
    <Box className="bg-primary p-5">
      <Box className="mb-6 flex flex-row items-center justify-between">
        <Heading
          as="h2"
          className="flex flex-row items-center gap-x-4 text-2xl"
        >
          {isOpen ? (
            <Stepper state="focussed">1</Stepper>
          ) : (
            <Stepper state="completed" />
          )}
          Shipping address
        </Heading>
        {!isOpen && cart.shipping_address && (
          <Button
            variant="tonal"
            size="sm"
            onClick={handleEdit}
            data-testid="edit-address-button"
          >
            Edit
          </Button>
        )}
      </Box>
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <Box>
            <ShippingAddress
              customer={customer}
              cart={cart}
              formik={checkout}
              checked={sameAsShipping}
              values={checkout.values}
              onChange={toggleSameAsShipping}
              handleChange={checkout.handleChange}
              errors={checkout.errors}
            />
            {!sameAsShipping && (
              <>
                <Divider className="my-6" />
                <Heading as="h2" className="pb-6 text-2xl">
                  Billing address
                </Heading>
                <BillingAddress
                  cart={cart}
                  values={checkout.values}
                  handleChange={checkout.handleChange}
                  errors={checkout.errors}
                />
              </>
            )}
            <SubmitButton
              isLoading={actionState?.pending || checkout.isSubmitting}
              className="mt-6"
              data-testid="submit-address-button"
            >
              Proceed to delivery
            </SubmitButton>
          </Box>
        </form>
      ) : (
        <Box>
          <div className="text-small-regular">
            {cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full flex-col items-start gap-x-1">
                  <div
                    className="flex flex-col p-4"
                    data-testid="shipping-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Shipping Address
                    </Text>
                    <Text className="text-secondary">
                      {cart.shipping_address.first_name}{' '}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-secondary">
                      {cart.shipping_address.company &&
                        `${cart.shipping_address.company}, `}
                      {cart.shipping_address.address_1},{' '}
                      {cart.shipping_address.postal_code},{' '}
                      {cart.shipping_address.city},{' '}
                      {cart.shipping_address.country_code?.toUpperCase()}
                      {cart.shipping_address?.province &&
                        `, ${cart.shipping_address.province}`}
                      ,
                    </Text>
                    <Text className="text-secondary">
                      {cart.email}, {cart.shipping_address?.phone}
                    </Text>
                  </div>
                  <div
                    className="flex flex-col p-4"
                    data-testid="billing-address-summary"
                  >
                    <Text size="lg" className="text-basic-primary">
                      Billing Address
                    </Text>
                    {sameAsShipping ? (
                      <Text className="text-secondary">
                        Same as shipping address
                      </Text>
                    ) : (
                      <>
                        <Text className="text-secondary">
                          {cart.billing_address.first_name}{' '}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text className="text-secondary">
                          {cart.billing_address.address_1},{' '}
                          {cart.billing_address.postal_code},{' '}
                          {cart.billing_address.city},{' '}
                          {cart.billing_address.country_code?.toUpperCase()}
                          {cart.billing_address?.province &&
                            `, ${cart.shipping_address.province}`}
                          ,
                        </Text>
                        <Text className="text-secondary">
                          {cart.billing_address?.phone}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </Box>
      )}
    </Box>
  )
}
