'use client'

import React from 'react'

import { ArrowLeftIcon } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import { Heading } from '@components/common/sub-components/heading'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import Items from '@components/order/sub-components/items'
import OrderDetails from '@components/order/sub-components/order-details'
import OrderSummary from '@components/order/sub-components/order-summary'
import ShippingDetails from '@components/order/sub-components/shipping-details'
import { HttpTypes } from '@medusajs/types'

import PaymentDetails from '../sub-components/payment-details'

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder & { status: string }
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <Box className="flex flex-col justify-center gap-6 small:gap-8">
      <Button variant="tonal" size="sm" asChild className="w-max">
        <LocalizedClientLink
          href="/account/orders"
          data-testid="back-to-overview-button"
        >
          <ArrowLeftIcon />
          Order history
        </LocalizedClientLink>
      </Button>
      <Heading as="h2" className="text-2xl small:text-3xl">
        Order #{order.display_id}
      </Heading>
      <Box
        className="flex h-full w-full flex-col gap-4"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} />
        <Items items={order.items} />
        <OrderSummary order={order} />
        <ShippingDetails order={order} />
        <PaymentDetails order={order} />
      </Box>
    </Box>
  )
}

export default OrderDetailsTemplate
