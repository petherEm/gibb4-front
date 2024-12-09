import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import RefinementList from '@components/common/sub-components/sort'
import { Text } from '@components/common/sub-components/text'
import { ProductCarousel } from '@components/products/sub-components/product-carousel'
import { search } from '@components/search/actions'
import SkeletonProductGrid from '@components/skeletons/templates/skeleton-product-grid'
import SkeletonProductsCarousel from '@components/skeletons/templates/skeleton-products-carousel'
import ProductFilters from '@components/store/sub-components/filters'
import ActiveProductFilters from '@components/store/sub-components/filters/active-filters'
import ProductFiltersDrawer from '@components/store/sub-components/filters/filters-drawer'
import PaginatedProducts from '@components/store/templates/paginated-products'
import { storeSortOptions } from '@lib/constants'
import { getCollectionByHandle } from '@lib/data/collections'
import { getProductsList, getStoreFilters } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import { StoreCollection } from '@medusajs/types'

export const runtime = 'edge'

export default async function CollectionTemplate({
  searchParams,
  params,
}: {
  searchParams: Record<string, string>
  params: { countryCode: string; handle: string }
}) {
  const { sortBy, page, type, material, price } = searchParams
  const { countryCode, handle } = params

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const currentCollection = await getCollectionByHandle(handle).then(
    (collection: StoreCollection) => collection
  )
  if (!currentCollection) notFound()

  const pageNumber = page ? parseInt(page) : 1
  const filters = await getStoreFilters()

  const { results, count } = await search({
    currency_code: region.currency_code,
    order: sortBy,
    page: pageNumber,
    collection: [currentCollection.id],
    type: type?.split(','),
    material: material?.split(','),
    price: price?.split(','),
  })

  // TODO: Add logic in future
  const { products: recommendedProducts } = await getProductsList({
    pageParam: 0,
    queryParams: { limit: 9 },
    countryCode: params.countryCode,
  }).then(({ response }) => response)

  return (
    <>
      <Container className="flex flex-col gap-8 !pb-8 !pt-4">
        <Box className="flex flex-col gap-4">
          <Text className="text-md text-secondary">
            {count === 1 ? `${count} product` : `${count} products`}
          </Text>
          <Box className="grid w-full grid-cols-2 items-center justify-between gap-2 small:flex small:flex-wrap">
            <Box className="hidden small:flex">
              <ProductFilters filters={filters} />
            </Box>
            <ProductFiltersDrawer>
              <ProductFilters filters={filters} />
            </ProductFiltersDrawer>
            <RefinementList
              options={storeSortOptions}
              sortBy={sortBy || 'relevance'}
            />
          </Box>
        </Box>
        <ActiveProductFilters
          filters={filters}
          currentCollection={currentCollection}
          countryCode={countryCode}
        />
        <Suspense fallback={<SkeletonProductGrid />}>
          {results && results.length > 0 ? (
            <PaginatedProducts
              products={results}
              page={pageNumber}
              total={count}
              countryCode={countryCode}
            />
          ) : (
            <p className="py-10 text-center text-lg text-secondary">
              No products.
            </p>
          )}
        </Suspense>
      </Container>
      {recommendedProducts && (
        <Suspense fallback={<SkeletonProductsCarousel />}>
          <ProductCarousel
            products={recommendedProducts}
            regionId={region.id}
            title="Recommended products"
          />
        </Suspense>
      )}
    </>
  )
}
