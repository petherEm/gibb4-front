'use client'

import { ChevronDownIcon } from '@components/common/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/common/sub-components/accordion'
import { Box } from '@components/common/sub-components/box'
import { Heading } from '@components/common/sub-components/heading'

type FilterWrapperProps = {
  title: string
  content: React.ReactNode
}

export default function FilterWrapper({ title, content }: FilterWrapperProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`item-${title}`} className="border-none">
        <AccordionTrigger className="!pb-0 transition-all [&[data-state=open]>#chevronDownSvg]:rotate-180">
          <Heading as="h3" className="text-lg font-medium text-basic-primary">
            {title}
          </Heading>
          <Box
            id="chevronDownSvg"
            className="flex shrink-0 items-center justify-center p-2.5 duration-200 ease-in-out"
          >
            <ChevronDownIcon className="transition-all duration-300 group-data-[headlessui-state=open]:rotate-180" />
          </Box>
        </AccordionTrigger>
        <AccordionContent className="mt-3 !pb-0">{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
