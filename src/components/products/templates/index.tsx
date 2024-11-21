import React, { Suspense } from 'react'

import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import ImageGallery from '@components/products/sub-components/image-gallery'
import ProductActions from '@components/products/sub-components/product-actions'
import ProductTabs from '@components/products/sub-components/product-tabs'
import ProductInfo from '@components/products/templates/product-info'
import SkeletonProductsCarousel from '@components/skeletons/templates/skeleton-products-carousel'
// import { getProductVariantsColors } from '@lib/data/fetch'
import { getProductsListByCollectionId } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'

import { ProductCarousel } from '../sub-components/product-carousel'
import ProductBreadcrumbs from './breadcrumbs'
import ProductActionsWrapper from './product-actions-wrapper'

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  cartItems?: HttpTypes.StoreCartLineItem[]
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  cartItems,
  countryCode,
}: ProductTemplateProps) => {
  // const variantsColors = await getProductVariantsColors()

  const { response: productsList } = await getProductsListByCollectionId({
    collectionId: product.collection_id,
    countryCode,
    excludeProductId: product.id,
  })

  console.log(productsList)

  return (
    <>
      <Container
        className="relative flex flex-col gap-y-6 !py-8 small:gap-y-12"
        data-testid="product-container"
      >
        <ProductBreadcrumbs product={product} countryCode={countryCode} />
        <Box className="relative flex flex-col gap-y-6 large:flex-row large:items-start large:gap-x-16 xl:gap-x-[120px]">
          <Box className="relative block w-full">
            <ImageGallery
              title={product.title}
              images={product?.images || []}
            />
          </Box>
          <Box className="flex w-full flex-col gap-y-6 py-8 large:sticky large:top-24 large:max-w-[440px] large:py-0">
            <ProductInfo product={product} />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  cartItems={cartItems}
                  // colors={variantsColors.data}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper
                id={product.id}
                region={region}
                cartItems={cartItems}
                // colors={variantsColors.data}
              />
            </Suspense>
            <ProductTabs product={product} />
          </Box>
        </Box>
      </Container>
      {productsList.products.length > 0 && (
        <Suspense fallback={<SkeletonProductsCarousel />}>
          <ProductCarousel
            products={productsList.products}
            regionId={region.id}
            title="You may also love"
          />
        </Suspense>
      )}
    </>
  )
}

export default ProductTemplate
