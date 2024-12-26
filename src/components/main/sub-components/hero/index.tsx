import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'

const Hero = () => {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex flex-col small:flex-col medium:flex-col large:flex-row">
        {/* Left Text Container - Order 2 on mobile */}
        <div className="order-2 flex w-full items-center justify-center px-4 small:order-2 small:min-h-[40vh] small:w-full small:p-2 medium:order-2 medium:min-h-[50vh] medium:w-full medium:p-4 large:order-1 large:min-h-screen large:w-1/2 large:p-12">
          <div className="flex max-w-[600px] flex-col items-start gap-6 py-8 small:gap-6 medium:gap-4 large:max-w-[600px] large:gap-8">
            <h1 className="xl:text-6xl w-full text-4xl font-semibold small:text-4xl medium:text-5xl large:text-5xl">
              Iconic Second-Hand Fashion
            </h1>
            <p className="text-base w-full font-light small:text-lg medium:text-xl large:text-xl">
              Discover our curated selection of unique handbags, shoes, and
              investment-worthy accessories.
            </p>
            <Button
              asChild
              variant="ghost"
              className="mt-2 p-0 text-lg underline transition-colors hover:bg-transparent small:text-xl"
            >
              <LocalizedClientLink
                href="/store"
                className="block !px-0 !py-3 text-left"
              >
                Explore
              </LocalizedClientLink>
            </Button>
          </div>
        </div>

        {/* Right Image Container - Order 1 on mobile */}
        <div className="relative order-1 -mt-[80px] h-[60vh] w-full small:order-1 small:min-h-[40vh] small:w-full medium:order-1 medium:h-[50vh] medium:w-full large:order-2 large:h-[986px] large:w-1/2">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/hero_1.png"
            alt="Luxury second-hand fashion hero image"
            fill
            priority
            quality={100}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
