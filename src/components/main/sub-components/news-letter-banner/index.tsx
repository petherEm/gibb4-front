'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import { Checkbox } from '@components/common/sub-components/checkbox'
import { Container } from '@components/common/sub-components/container'
import { Input } from '@components/common/sub-components/input'

export default function NewsletterSignup() {
  const [isChecked, setIsChecked] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // Here you would typically send the data to your server
    console.log('Form submitted:', Object.fromEntries(formData))
  }

  return (
    <Container className="w-[90%] px-4 small:max-w-[90%] small:px-0 medium:max-w-[90%]">
      <div className="mx-auto flex flex-col items-start gap-6 small:flex-row small:gap-x-10">
        {/* Image Section */}
        <div className="relative order-1 aspect-square w-full overflow-hidden small:order-none small:aspect-auto small:h-[300px] small:w-1/2">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Elegant_sandals.png"
            alt="Elegant sandals"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Text and Form Section */}
        <div className="w-full space-y-6 small:w-1/2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight tracking-tight small:text-4xl">
              Join us
              <br />
              and receive 100 PLN
              <br />
              for your first purchase.
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="mx-4 flex-1 rounded-none border-x-0 border-t-0 border-b-black bg-transparent px-0 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                className="rounded-none text-black hover:bg-transparent hover:text-gray-600"
              >
                Join
              </Button>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="privacy"
                name="privacy"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                className="mt-1 rounded-none"
                required
              />
              <label
                htmlFor="privacy"
                className="text-sm leading-tight text-gray-600"
              >
                I consent to the processing of personal data for the purpose of
                receiving the newsletter. Check our privacy policy. You can
                unsubscribe at any time.
              </label>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
