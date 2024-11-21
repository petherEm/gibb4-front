import React from 'react'
import { Metadata } from 'next'

import Footer from '@components/layout/templates/footer'
import NavWrapper from '@components/layout/templates/nav'
import { getBaseURL } from '@lib/util/env'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  params: { countryCode: string }
  children: React.ReactNode
}) {
  const { countryCode } = await props.params
  console.log(countryCode)

  return (
    <>
      <NavWrapper countryCode={countryCode} />

      {props.children}
      <Footer countryCode={countryCode} />
    </>
  )
}
