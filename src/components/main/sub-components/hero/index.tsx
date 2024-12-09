import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'

const Hero = () => {
  return (
    <section className="flex min-h-screen w-full flex-col small:min-h-0 small:flex-row">
      {/* Text Container */}
      <div className="flex w-full items-center justify-center p-6 small:w-1/2 small:p-12 large:w-1/2">
        <div className="flex max-w-[500px] flex-col items-start gap-3 large:max-w-[600px]">
          <h1 className="xl:text-6xl mb-4 w-3/4 text-3xl font-semibold small:text-4xl large:text-5xl">
            Iconic Second-Hand Fashion
          </h1>
          <p className="w-3/4 text-md font-light small:text-xl large:text-xl">
            Discover our curated selection of unique handbags, shoes, and
            investment-worthy accessories.
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
              Explore
            </LocalizedClientLink>
          </Button>
        </div>
      </div>
      {/* Image Container */}
      <div className="relative h-[50vh] w-full small:h-[600px] small:w-1/2 large:w-1/2">
        <Image
          src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/hero_1.png"
          alt="hero"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 60vw"
        />
      </div>
    </section>
  )
}

export default Hero
