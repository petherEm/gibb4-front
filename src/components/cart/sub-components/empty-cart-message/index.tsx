import { BagIcon } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import { Heading } from '@components/common/sub-components/heading'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import { Text } from '@components/common/sub-components/text'

const EmptyCartMessage = () => {
  return (
    <Box className="flex flex-col items-center gap-6 text-basic-primary">
      <BagIcon className="h-14 w-14" />
      <Box className="flex flex-col items-center gap-2">
        <Heading as="h2" className="text-xl small:text-2xl">
          Your shopping cart is empty
        </Heading>
        <Text size="md" className="text-secondary">
          Are you looking for inspiration?
        </Text>
      </Box>
      <Button asChild>
        <LocalizedClientLink href="/">Explore Home Page</LocalizedClientLink>
      </Button>
    </Box>
  )
}

export default EmptyCartMessage
