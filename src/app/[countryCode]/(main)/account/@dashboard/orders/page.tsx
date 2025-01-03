import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import OrderOverview, {
  OrderType,
} from '@components/account/sub-components/order-overview'
import { listOrders } from '@lib/data/orders'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.',
}

type Props = {
  searchParams: {
    sortBy?: string
    page?: string
  }
}

export const ORDERS_LIMIT = 2

export default async function Orders({ searchParams }: Props) {
  const { sortBy, page } = searchParams
  const currentPage = page ? parseInt(page) : 1

  const orders = await listOrders(
    (currentPage - 1) * ORDERS_LIMIT,
    ORDERS_LIMIT
  )

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <OrderOverview orders={orders as OrderType[]} page={page} />
    </div>
  )
}
