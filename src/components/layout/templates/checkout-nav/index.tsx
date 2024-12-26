import { ArrowLeftIcon, SolaceLogo } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import { Container } from '@components/common/sub-components/container'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import { Text } from '@components/common/sub-components/text'

export default function CheckoutNav() {
  return (
    <Container
      as="nav"
      className="flex h-full items-center justify-between !py-3 small:!py-4"
    >
      <Box className="small:flex-1">
        <Button variant="tonal" asChild className="w-max">
          <LocalizedClientLink href="/cart">
            <Box className="flex gap-2">
              <ArrowLeftIcon />
              <Text>
                Back to{' '}
                <Text as="span" className="hidden small:inline">
                  shopping
                </Text>{' '}
                cart
              </Text>
            </Box>
          </LocalizedClientLink>
        </Button>
      </Box>
      <Box className="flex items-center justify-end small:flex-1 small:justify-center">
        <LocalizedClientLink href="/">
          <h1 className="-mt-2 font-playfair text-3xl font-bold small:text-3xl large:text-4xl">
            Gibbarosa
          </h1>
        </LocalizedClientLink>
      </Box>
      <div className="hidden flex-1 basis-0 small:flex" />
    </Container>
  )
}
