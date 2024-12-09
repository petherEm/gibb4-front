import {
  ChevronDownIcon,
  FacebookIcon,
  LinkedinIcon,
  SolaceLogo,
  XLogoIcon,
} from '@components/common/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/common/sub-components/accordion'
import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import Divider from '@components/common/sub-components/divider'
import { Heading } from '@components/common/sub-components/heading'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import { NavigationItem } from '@components/common/sub-components/navigation-item'
import { Text } from '@components/common/sub-components/text'
import { createFooterNavigation } from '@lib/constants'
import { getCategoriesList } from '@lib/data/categories'
import { cn } from '@lib/util/cn'

function SocialMedia({ className }: { className?: string }) {
  return (
    <Box className={cn('flex gap-2', className)}>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-static">
        <LocalizedClientLink href="#">
          <LinkedinIcon />
        </LocalizedClientLink>
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-static">
        <LocalizedClientLink href="#">
          <FacebookIcon />
        </LocalizedClientLink>
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-static">
        <LocalizedClientLink href="#">
          <XLogoIcon />
        </LocalizedClientLink>
      </div>
    </Box>
  )
}

export default async function Footer({ countryCode }: { countryCode: string }) {
  const { product_categories } = await getCategoriesList()
  const footerNavigation = createFooterNavigation(product_categories)

  return (
    <Container
      as="footer"
      className="mx-0 max-w-full border-t border-basic-primary bg-static px-0 py-0 small:px-0 small:py-0"
    >
      <Container className="flex flex-col gap-6 text-static small:gap-12">
        <Box className="flex flex-col gap-8 small:gap-12 large:flex-row xl:gap-0">
          <Box className="flex flex-col justify-between xl:min-w-[437px]">
            <LocalizedClientLink
              href="#"
              className="w-max cursor-pointer text-static"
            >
              <h1 className="font-playfair text-4xl">Gibbarosa</h1>
            </LocalizedClientLink>
            <SocialMedia className="hidden large:flex" />
          </Box>
          <Box className="hidden shrink grow gap-5 small:flex xl:gap-0">
            {footerNavigation.navigation.map((item, id) => {
              return (
                <Box
                  key={`footerSection-${id}`}
                  className="hidden flex-1 flex-col gap-3 small:flex"
                >
                  <Heading className="mb-2 text-lg" as="h3">
                    {item.header}
                  </Heading>
                  {item.links.map((link, linkId) => {
                    return (
                      <NavigationItem
                        href={`/${countryCode}${link.href}`}
                        key={`${id}-navigationItem-${linkId}`}
                        variant="secondary"
                        className="w-max hover:text-static"
                      >
                        {link.title}
                      </NavigationItem>
                    )
                  })}
                </Box>
              )
            })}
          </Box>
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-6 small:hidden"
          >
            {footerNavigation.navigation.map((item, id) => {
              return (
                <AccordionItem
                  value={`item-${id}`}
                  key={id}
                  className="border-none"
                >
                  <AccordionTrigger className="transition-all [&[data-state=open]>#chevronDownSvg]:rotate-180">
                    <Heading
                      className="text-md font-medium text-static small:text-lg"
                      as="h3"
                    >
                      {item.header}
                    </Heading>
                    <div
                      id="chevronDownSvg"
                      className="flex h-12 w-12 shrink-0 items-center justify-center text-static duration-200 ease-in-out"
                    >
                      <ChevronDownIcon />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-3">
                    {item.links.map((link, linkId) => {
                      return (
                        <NavigationItem
                          href={link.href}
                          key={`${id}-navigationItem-${linkId}`}
                          variant="secondary"
                          className="hover:text-static"
                        >
                          {link.title}
                        </NavigationItem>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
          <SocialMedia className="flex large:hidden" />
        </Box>
        <Divider alignment="horizontal" variant="secondary" />
        <Box className="flex flex-wrap gap-6 gap-y-1">
          <Text size="md" className="shrink-0 text-secondary">
            © {new Date().getFullYear()} Gibbarosa. All rights reserved.
          </Text>
          {footerNavigation.other.map((link, id) => (
            <NavigationItem
              key={`other-${id}`}
              variant="secondary"
              className="shrink-0 hover:text-static"
              href={link.href}
            >
              {link.title}
            </NavigationItem>
          ))}
        </Box>
      </Container>
    </Container>
  )
}
