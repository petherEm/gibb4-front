import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import { Heading } from '@components/common/sub-components/heading'
import StoreBreadcrumbs from '@components/store/templates/breadcrumbs'
import { getCategoryByHandle, listCategories } from '@lib/data/categories'
import { listRegions } from '@lib/data/regions'
import { StoreProductCategory, StoreRegion } from '@medusajs/types'

interface CategoryPageLayoutProps {
  children: React.ReactNode
  params: { category: string[] }
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({
  params,
}: CategoryPageLayoutProps): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(params.category)

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(' | ')

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`

    return {
      title: `${title} | Gibbarosa Preowned Luxury`,
      description,
      alternates: {
        canonical: `${params.category.join('/')}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPageLayout({
  children,
  params: { category },
}: CategoryPageLayoutProps) {
  const { product_categories } = await getCategoryByHandle(category)
  const currentCategory = product_categories[product_categories.length - 1]

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs breadcrumb={currentCategory.name} />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            {currentCategory.name ? currentCategory.name : 'Category'}
          </Heading>
        </Box>
      </Container>
      {children}
    </>
  )
}
