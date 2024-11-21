import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProfileDetails from '@components/account/sub-components/profile-details'
import Divider from '@components/common/sub-components/divider'
import { getCustomer } from '@lib/data/customer'
import { listRegions } from '@lib/data/regions'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Gibbarosa profile.',
}

export default async function Profile() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div
      className="xl:ml-auto xl:max-w-[900px]"
      data-testid="profile-page-wrapper"
    >
      <ProfileDetails customer={customer} />
      <Divider className="mt-6" />
    </div>
  )
}
