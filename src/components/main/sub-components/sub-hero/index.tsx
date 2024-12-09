import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'

const SubHero = () => {
  return (
    <section className="mt-10 flex min-h-screen w-full flex-col p-8 small:min-h-0 small:flex-row">
      {/* Left Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden small:w-1/2">
        <Image
          src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Sub-hero_1.png"
          alt="hero"
          fill
          priority
          quality={100}
          className="object-cover" // Removed scale and fixed
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      {/* Text & Images Container */}
      <div className="flex w-full flex-col justify-center p-6 small:w-1/2 small:px-12">
        <div className="flex max-w-[500px] flex-col items-start gap-6 large:max-w-[600px]">
          <h1 className="xl:text-6xl w-full text-3xl font-semibold small:text-4xl large:text-5xl">
            Nasza historia
          </h1>
          <p className="w-full text-md font-light small:text-xl">
            Gibbarosa powstała z miłości do historii, dziedzictwa i savoir-faire
            luksusowych domów mody.
          </p>
          <div className="flex w-full">
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
          <p className="w-full text-md font-light small:text-xl">
            Dajemy drugie życie ponadczasowym produktom, które należy traktować
            jak prawdziwe inwestycje.
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
              Poznaj nas
            </LocalizedClientLink>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SubHero
