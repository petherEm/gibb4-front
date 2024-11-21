import { cache } from 'react'

import { sdk } from '@lib/config'

// Shipping actions
export const listCartPaymentMethods = cache(async function (regionId: string) {
  return sdk.store.payment
    .listPaymentProviders(
      { region_id: regionId },
      { next: { tags: ['payment_providers'] } }
    )
    .then(({ payment_providers }) => payment_providers)
    .catch((error) => {
      console.error('Error fetching payment providers:', error)
    })
})
