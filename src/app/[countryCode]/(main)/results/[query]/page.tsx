import { Metadata } from 'next'

import SearchResultsTemplate from '@components/search/templates/search-results-template'
import { getRegion } from '@lib/data/regions'
import { safeDecodeURIComponent } from '@lib/util/safe-decode-uri'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Explore all of our products.',
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: string
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { sortBy, page, collection, type, material, price } = searchParams
  const { query, countryCode } = params
  const decodedQuery = safeDecodeURIComponent(query)

  const region = await getRegion(countryCode)

  return (
    <SearchResultsTemplate
      query={decodedQuery}
      sortBy={sortBy}
      page={page}
      collection={collection?.split(',')}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
