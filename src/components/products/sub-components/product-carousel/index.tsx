import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import { Container } from '@components/common/sub-components/container'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import { StoreProduct } from '@medusajs/types'

import ProductTile from '../product-tile'
import CarouselWrapper from './carousel-wrapper'

interface ViewAllProps {
  link: string
  text?: string
}

interface ProductCarouselProps {
  products: StoreProduct[]
  regionId: string
  title: string
  viewAll?: ViewAllProps
}

export function ProductCarousel({
  products,
  regionId,
  title,
  viewAll,
}: ProductCarouselProps) {
  const displayProducts = products.slice(0, 4)

  return (
    <Container className="w-[90%] !px-0 small:max-w-[90%] medium:max-w-[90%]">
      <Box className="flex flex-col gap-8">
        <CarouselWrapper title={title} productsCount={products.length}>
          <Box className="grid grid-cols-1 gap-6 small:grid-cols-2 medium:grid-cols-2 large:grid-cols-4">
            {displayProducts.map((item, index) => (
              <Box key={index}>
                <ProductTile product={item} regionId={regionId} />
              </Box>
            ))}
          </Box>
        </CarouselWrapper>

        {viewAll && (
          <Box className="mt-6 w-fit text-center">
            <Button asChild>
              <LocalizedClientLink href={viewAll.link} className="px-8 py-4">
                {viewAll.text || 'View all'}
              </LocalizedClientLink>
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}
