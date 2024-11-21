import { Box } from '@components/common/sub-components/box'
import CartButton from '@components/layout/sub-components/cart-button'
import ProfileButton from '@components/layout/sub-components/profile-button'

export default function NavActions() {
  return (
    <Box className="flex items-center !py-4">
      <ProfileButton />
      <CartButton />
    </Box>
  )
}
