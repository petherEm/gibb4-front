import React from 'react'

import { ArrowLeftIcon } from '@components/common/icons'
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsSeparator,
  BreadcrumbsStatic,
} from '@components/common/sub-components/breadcrumbs'
import { StoreProduct } from '@medusajs/types'

export default function ProductBreadcrumbs({
  product,
  countryCode,
}: {
  product: StoreProduct
  countryCode: string
}) {
  return (
    <>
      <Breadcrumbs className="text-basic-primary">
        <BreadcrumbsList className="hidden small:flex">
          <BreadcrumbsItem>
            <BreadcrumbsLink href="/">Home Page</BreadcrumbsLink>
          </BreadcrumbsItem>
          {product?.categories?.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-center gap-2"
            >
              <BreadcrumbsSeparator />
              <BreadcrumbsItem>
                <BreadcrumbsLink
                  href={`/${countryCode}/categories/${category.handle}`}
                >
                  {category.name}
                </BreadcrumbsLink>
              </BreadcrumbsItem>
            </div>
          ))}
          <BreadcrumbsSeparator />
          <BreadcrumbsItem>
            <BreadcrumbsStatic>{product?.title}</BreadcrumbsStatic>
          </BreadcrumbsItem>
        </BreadcrumbsList>
        <BreadcrumbsList className="flex small:hidden">
          <BreadcrumbsItem>
            {product?.categories?.length > 0 && (
              <BreadcrumbsLink
                href={`/${countryCode}/categories/${product.categories[product.categories.length - 1].handle}`}
                className="flex items-center gap-2 text-md"
              >
                <ArrowLeftIcon className="h-[18px] w-[18px]" />
                {product.categories[product.categories.length - 1].name}
              </BreadcrumbsLink>
            )}
            {product?.categories?.length === 0 && (
              <BreadcrumbsLink
                href="/"
                className="flex items-center gap-2 text-md"
              >
                <ArrowLeftIcon className="h-[18px] w-[18px]" />
                Back to Home Page
              </BreadcrumbsLink>
            )}
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    </>
  )
}
