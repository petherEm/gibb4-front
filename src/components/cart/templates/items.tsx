import React from 'react'

import Item from '@components/cart/sub-components/item'
import SkeletonLineItem from '@components/skeletons/sub-components/skeleton-line-item'
import repeat from '@lib/util/repeat'
import { HttpTypes } from '@medusajs/types'

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsTemplate = ({ items }: ItemsTemplateProps) => {
  return (
    <>
      {items
        ? items
            .sort((a, b) => {
              return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
            })
            .map((item) => {
              return <Item key={item.id} item={item} />
            })
        : repeat(5).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </>
  )
}

export default ItemsTemplate
