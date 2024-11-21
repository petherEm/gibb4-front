import { Suspense } from 'react'
import { Metadata } from 'next'

import { ProductCarousel } from '@components/products/sub-components/product-carousel'
import { getCollectionsList } from '@lib/data/collections'
import { getProductsList } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'

export default async function Home(props: {
  params: { countryCode: string }
  children: React.ReactNode
}) {
  const { countryCode } = await props.params

  const [{ collections: collectionsList }, { products }] = await Promise.all([
    getCollectionsList(),
    getProductsList({
      pageParam: 1,
      queryParams: { limit: 9 },
      countryCode: countryCode,
    }).then(({ response }) => response),
  ])

  const region = await getRegion(countryCode)

  if (!products || !collectionsList || !region) {
    return null
  }
  console.log(products)

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>HeroBanner</h1>
      <ProductCarousel
        products={products}
        regionId={region.id}
        title="Our bestsellers"
        viewAll={{
          link: '/store',
          text: 'View all',
        }}
      />
    </div>
  )
}
