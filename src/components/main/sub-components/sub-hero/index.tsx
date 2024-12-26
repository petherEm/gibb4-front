import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import { Container } from '@components/common/sub-components/container'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'

const SubHero = () => {
  return (
    <Container className="w-[90%] !px-0 small:max-w-[90%] medium:max-w-[90%]">
      <div className="mx-auto flex flex-col items-start gap-x-4 small:min-h-0 small:flex-row small:gap-x-10">
        {/* Left Image Container - Adjusted to match right side */}
        <div className="relative aspect-[6/9] w-full small:w-1/2 large:w-1/2">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Sub-hero_1.png"
            alt="hero"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 60vw"
          />
        </div>

        {/* Text Container */}
        <div className="flex w-full items-center justify-center small:w-1/2 large:w-1/2">
          <div className="flex max-w-[500px] flex-col items-start gap-3 large:max-w-[600px]">
            <h1 className="xl:text-6xl mb-4 mt-4 text-3xl font-semibold small:text-4xl medium:mt-0 medium:w-3/4 large:text-5xl">
              Our Story
            </h1>
            <p className="text-md font-light small:text-xl medium:w-3/4">
              Gibbarosa was born out of a love for history, heritage, and the
              savoir-faire of luxury fashion houses.
            </p>
            <div className="flex w-full gap-y-2">
              <div className="relative aspect-[6/9] w-1/2">
                <Image
                  src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Sub-hero_1.png"
                  alt="hero 2"
                  fill
                  priority
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 45vw"
                />
              </div>
              <div className="relative aspect-[6/9] w-1/2">
                <Image
                  src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Sub-hero_1.png"
                  alt="hero 2"
                  fill
                  priority
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 45vw"
                />
              </div>
            </div>
            <p className="text-md font-light small:text-xl medium:w-3/4">
              We give a second life to timeless products that should be treated
              as true investments.
            </p>
            <Button
              asChild
              variant="ghost"
              className="p-0 text-xl underline hover:bg-transparent"
            >
              <LocalizedClientLink
                href="/store"
                className="block !px-0 !py-3 text-left"
              >
                Get to know us
              </LocalizedClientLink>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SubHero
