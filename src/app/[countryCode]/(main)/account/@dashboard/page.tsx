import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Overview from '@components/account/sub-components/overview'
import { getCustomer } from '@lib/data/customer'
import { listOrders } from '@lib/data/orders'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Overview of your account activity.',
}

export default async function OverviewTemplate() {
  const customer = await getCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <Overview orders={orders} />
}
