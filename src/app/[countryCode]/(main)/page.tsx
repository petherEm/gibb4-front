import { Suspense } from 'react'
import { Metadata } from 'next'

import Hero from '@components/main/sub-components/hero'
import InstaFeed from '@components/main/sub-components/insta-feed'
import MidBanner from '@components/main/sub-components/mid-banner'
import NewsletterBanner from '@components/main/sub-components/news-letter-banner'
import SubHero from '@components/main/sub-components/sub-hero'
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

  // MOVE IT POTENTIALLY TO LIB AS A FILTERED PRODUCT FETCHING

  // Find the "New" collection
  const newCollection = collectionsList.find(
    (collection) => collection.title === 'New' || collection.handle === 'new'
  )

  // Filter products belonging to the "New" collection
  const newCollectionProducts = products.filter(
    (product) => product.collection.id === newCollection?.id
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Hero />
      <SubHero />

      <ProductCarousel
        products={newCollectionProducts}
        regionId={region.id}
        title="New"
        viewAll={{
          link: '/store',
          text: 'View all',
        }}
      />
      <MidBanner />
      <ProductCarousel
        products={products}
        regionId={region.id}
        title="Nasze ikony"
        viewAll={{
          link: '/store',
          text: 'View all',
        }}
      />
      <NewsletterBanner />

      <InstaFeed />
    </div>
  )
}
