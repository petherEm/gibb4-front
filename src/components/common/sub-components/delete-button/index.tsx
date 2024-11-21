import { useState } from 'react'

import { TrashIcon } from '@components/common/icons'
import { Button } from '@components/common/sub-components/button'
import { deleteLineItem } from '@lib/data/cart'
import { Spinner } from '@medusajs/icons'
import { clx } from '@medusajs/ui'

import { toast } from '../toast'

const DeleteButton = ({
  id,
  children,
  className,
  variant = 'tonal',
}: {
  id: string
  children?: React.ReactNode
  className?: string
  variant?: 'tonal' | 'text' | 'filled' | 'ghost' | 'destructive' | 'icon'
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)

    await deleteLineItem(id)
      .catch((err) => {
        toast('error', err)
      })
      .finally(() => {
        toast('success', 'Product was removed from cart.')
        setIsDeleting(false)
      })
  }

  return (
    <Button
      withIcon
      variant={variant}
      className={clx(
        'bg-primary',
        { 'pointer-events-none': isDeleting },
        className
      )}
      onClick={() => handleDelete(id)}
    >
      {isDeleting ? (
        <div className="flex h-5 w-5 items-center justify-center">
          <Spinner className="animate-spin" />
        </div>
      ) : (
        <TrashIcon className="h-5 w-5" />
      )}
      {children && <span>{children}</span>}
    </Button>
  )
}

export default DeleteButton
