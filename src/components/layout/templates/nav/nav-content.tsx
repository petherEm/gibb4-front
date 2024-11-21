'use client'

import { useState } from 'react'

import { SearchIcon, SolaceLogo } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import SideMenu from '@components/layout/sub-components/side-menu'
import { SearchDialog } from '@components/search/sub-components/search-dialog'
import SearchDropdown from '@components/search/sub-components/search-dropdown'
import { cn } from '@lib/util/cn'

import Navigation from './navigation'

export default function NavContent(props: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <Box className="flex large:hidden">
        {/* <SideMenu
          productCategories={props.productCategories}
          collections={props.collections}
          // strapiCollections={props.strapiCollections}
        /> */}
      </Box>
      {!isSearchOpen && (
        <Navigation
          countryCode={props.countryCode}
          productCategories={props.productCategories}
          collections={props.collections}
          // strapiCollections={props.strapiCollections}
        />
      )}
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
      <Box
        className={cn('relative block', {
          'medium:absolute medium:left-1/2 medium:top-1/2 medium:-translate-x-1/2 medium:-translate-y-1/2':
            !isSearchOpen,
          'right-0 z-40': isSearchOpen,
        })}
      >
        <LocalizedClientLink href="/">
          {/* <SolaceLogo className="h-6 medium:h-7" /> */}
          <h1 className="text-3xl font-bold">Gibbarosa</h1>
        </LocalizedClientLink>
      </Box>
      {!isSearchOpen && (
        <Button
          variant="icon"
          withIcon
          className="ml-auto h-auto !p-2 xsmall:!p-3.5"
          onClick={() => setIsSearchOpen(true)}
        >
          <SearchIcon />
        </Button>
      )}
    </>
  )
}
