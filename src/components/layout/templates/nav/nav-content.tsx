'use client'

import { useState } from 'react'

import { SearchIcon } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import SideMenu from '@components/layout/sub-components/side-menu'
import { SearchDialog } from '@components/search/sub-components/search-dialog'
import SearchDropdown from '@components/search/sub-components/search-dropdown'

import Navigation from './navigation'

export default function NavContent(props: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <Box className="flex w-full items-center">
        <Box className="flex items-center gap-2">
          <Box className="flex large:hidden">
            <SideMenu
              productCategories={props.productCategories}
              collections={props.collections}
              featuredCollections={props.featuredCollections}
            />
          </Box>

          <LocalizedClientLink href="/">
            <h1 className="-mt-2 font-playfair text-[28px] font-bold small:text-3xl large:text-4xl">
              Gibbarosa
            </h1>
          </LocalizedClientLink>

          {!isSearchOpen && (
            <Box className="ml-4">
              <Navigation
                countryCode={props.countryCode}
                productCategories={props.productCategories}
                collections={props.collections}
                featuredCollections={props.featuredCollections}
              />
            </Box>
          )}
        </Box>

        <Box className="ml-auto flex items-center">
          {isSearchOpen && (
            <SearchDropdown
              setIsOpen={setIsSearchOpen}
              recommendedProducts={props.products}
              isOpen={isSearchOpen}
              countryCode={props.countryCode}
            />
          )}
          <SearchDialog
            recommendedProducts={props.products}
            countryCode={props.countryCode}
            isOpen={isSearchOpen}
            handleOpenDialogChange={setIsSearchOpen}
          />
          {!isSearchOpen && (
            <Button
              variant="icon"
              withIcon
              className="h-auto !p-2 xsmall:!p-3.5"
              onClick={() => setIsSearchOpen(true)}
            >
              <SearchIcon />
            </Button>
          )}
        </Box>
      </Box>
    </>
  )
}
