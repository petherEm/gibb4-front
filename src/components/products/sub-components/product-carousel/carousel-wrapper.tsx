'use client'

import { useCallback, useEffect, useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@components/common/icons'
import { Box } from '@components/common/sub-components/box'
import { Button } from '@components/common/sub-components/button'
import { Heading } from '@components/common/sub-components/heading'
import { cn } from '@lib/util/cn'
import useEmblaCarousel from 'embla-carousel-react'

interface CarouselWrapperProps {
  children: React.ReactNode
  title: string
  productsCount: number
}

export default function CarouselWrapper({
  children,
  title,
  productsCount,
}: CarouselWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    loop: false,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const isLessThanFourProducts = productsCount < 4
  const isLessThanThreeProducts = productsCount < 3
  const isLessThanTwoProducts = productsCount < 2

  return (
    <>
      <Box className="flex justify-between">
        <Heading as="h2" className="text-2xl text-basic-primary small:text-3xl">
          {title}
        </Heading>
        <Box
          className={cn('mb-4 hidden justify-end gap-2 small:flex', {
            'xl:hidden': isLessThanFourProducts,
            'medium:hidden': isLessThanThreeProducts,
            'small:hidden': isLessThanTwoProducts,
          })}
        >
          <Button
            withIcon
            variant="icon"
            className="bg-fg-secondary text-action-primary hover:bg-fg-secondary-hover hover:text-action-primary-hover active:bg-fg-secondary-pressed active:text-action-primary-pressed"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            withIcon
            variant="icon"
            className="bg-fg-secondary text-action-primary hover:bg-fg-secondary-hover hover:text-action-primary-hover active:bg-fg-secondary-pressed active:text-action-primary-pressed"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ArrowRightIcon />
          </Button>
        </Box>
      </Box>
      <div ref={emblaRef}>{children}</div>
    </>
  )
}
