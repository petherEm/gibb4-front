'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Box } from '@components/common/sub-components/box'
import { NavigationItem } from '@components/common/sub-components/navigation-item'
import { createNavigation } from '@lib/constants'
import { cn } from '@lib/util/cn'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import { CollectionsData } from 'types/strapi'

import CollectionsMenu from './collections-menu'
import DropdownMenu from './dropdown-menu'

export default function Navigation({
  countryCode,
  productCategories,
  collections,
  featuredCollections,
}: {
  countryCode: string
  productCategories: StoreProductCategory[]
  collections: StoreCollection[]
  featuredCollections?: CollectionsData
}) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<{
    name: string
    handle: string
  } | null>(null)

  const navigation = useMemo(
    () => createNavigation(productCategories, collections),
    [productCategories, collections]
  )

  return (
    <Box className="hidden gap-4 self-stretch large:flex">
      {navigation.map((item: any, index: number) => {
        const handle = item.name.toLowerCase().replace(' ', '-')
        const isCategories =
          handle === 'shop' && pathname.includes(`/${countryCode}/categories`)
        const active = pathname.includes(`/${countryCode}/${handle}`)

        return (
          <DropdownMenu
            key={index}
            item={item}
            activeItem={openDropdown}
            isOpen={openDropdown?.name === item.name}
            onOpenChange={(open) => {
              setOpenDropdown(
                open ? { name: item.name, handle: item.handle } : null
              )
            }}
            customContent={
              item.name === 'Collections' ? (
                <CollectionsMenu
                  cmsCollections={featuredCollections}
                  medusaCollections={collections}
                />
              ) : undefined
            }
          >
            <div className="flex h-full items-center">
              <NavigationItem
                href={`/${countryCode}${item.handle}`}
                className={cn('!py-2 px-2', {
                  'border-b border-action-primary': active || isCategories,
                })}
              >
                {item.name}
              </NavigationItem>
            </div>
          </DropdownMenu>
        )
      })}
    </Box>
  )
}
