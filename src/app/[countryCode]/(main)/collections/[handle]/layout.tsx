import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import { Heading } from '@components/common/sub-components/heading'
import StoreBreadcrumbs from '@components/store/templates/breadcrumbs'
import {
  getCollectionByHandle,
  getCollectionsList,
} from '@lib/data/collections'
import { listRegions } from '@lib/data/regions'
import { StoreCollection, StoreRegion } from '@medusajs/types'

interface CollectionPageLayoutProps {
  children: React.ReactNode
  params: { handle: string; countryCode: string }
}

export async function generateStaticParams() {
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({
  params,
}: CollectionPageLayoutProps): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Solace Medusa Starter`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPageLayout({
  children,
  params: { handle },
}: CollectionPageLayoutProps) {
  const currentCollection = await getCollectionByHandle(handle).then(
    (collection: StoreCollection) => collection
  )

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs breadcrumb={currentCollection.title} />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            {currentCollection.title}
          </Heading>
        </Box>
      </Container>
      {children}
    </>
  )
}