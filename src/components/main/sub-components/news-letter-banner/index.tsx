'use client'

import { useState } from 'react'
import Form from 'next/form'
import Image from 'next/image'

import { Button } from '@components/common/sub-components/button'
import { Checkbox } from '@components/common/sub-components/checkbox'
import { Container } from '@components/common/sub-components/container'
import { Input } from '@components/common/sub-components/input'

export default function NewsletterSignup() {
  const [isChecked, setIsChecked] = useState(false)

  async function handleSubmit(formData: FormData) {
    // Here you would typically send the data to your server
    console.log('Form submitted:', Object.fromEntries(formData))
  }

  return (
    <Container className="mx-auto max-w-7xl px-4">
      <div className="flex flex-col items-center gap-8 px-4 py-12 small:flex-row small:items-start small:gap-12 small:px-8">
        <div className="sm:w-1/2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight tracking-tight small:text-4xl">
              Dołącz do nas
              <br />i otrzymaj 100zł na
              <br />
              pierwsze zakupy.
            </h2>
          </div>
          <Form action={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Twój adres email"
                required
                className="flex-1 rounded-none border-x-0 border-t-0 border-b-black px-0 placeholder:text-gray-500 focus-visible:border-b-black focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                className="rounded-none text-black hover:bg-transparent hover:text-gray-600"
              >
                Dołącz
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
                Wyrażam zgodę na przetwarzanie danych osobowych w celu
                otrzymywania newslettera. Sprawdź naszą politykę prywatności.
                Możesz anulować subskrypcję kiedy chcesz.
              </label>
            </div>
          </Form>
        </div>
        <div className="relative aspect-square w-full overflow-hidden small:aspect-auto small:h-[300px] small:w-2/3">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Elegant_sandals.png"
            alt="Elegant sandals"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </Container>
  )
}
