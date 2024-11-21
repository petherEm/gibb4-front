'use client'

import Item from '@components/cart/sub-components/item'
import { Box } from '@components/common/sub-components/box'
import SkeletonLineItem from '@components/skeletons/sub-components/skeleton-line-item'
import repeat from '@lib/util/repeat'
import { HttpTypes } from '@medusajs/types'
import { clx, Table } from '@medusajs/ui'

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsPreviewTemplate = ({ items }: ItemsTemplateProps) => {
  const hasOverflow = items && items.length > 4

  return (
    <Box
      className={clx({
        'no-scrollbar max-h-[420px] overflow-x-hidden overflow-y-scroll pl-[1px]':
          hasOverflow,
      })}
    >
      <Table>
        <Table.Body
          data-testid="items-table"
          className="flex flex-col gap-y-2 border-none"
        >
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
                })
                .map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Item item={item} type="preview" />
                      </td>
                    </tr>
                  )
                })
            : repeat(5).map((i) => {
                return (
                  <tr key={i}>
                    <td>
                      <SkeletonLineItem />
                    </td>
                  </tr>
                )
              })}
        </Table.Body>
      </Table>
    </Box>
  )
}

export default ItemsPreviewTemplate
