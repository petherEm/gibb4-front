import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'

const MidBanner = () => {
  return (
    <section className="relative w-full">
      <div className="relative h-[800px] w-full">
        <Image
          src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/layinglady.jpg"
          alt="Fashion model on couch with designer bag"
          fill
          priority
          quality={100}
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
      </div>
      <div className="sm:p-12 absolute inset-0 flex flex-col justify-center p-8">
        <div className="max-w-xl">
          <h1 className="sm:text-5xl mb-4 text-4xl font-bold text-black">
            Nasze ikony
          </h1>
          <p className="mb-6 max-w-md text-lg text-black">
            Prawdziwe skarby dla koneserek i kolekcjonerek mody. Na prezent też
            polecamy.
          </p>
          <Button variant="link" className="text-black hover:text-black/80">
            Zobacz →
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MidBanner
