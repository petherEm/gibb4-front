import { Container } from '@components/common/sub-components/container'
import SkeletonProductPreview from '@components/skeletons/sub-components/skeleton-product-preview'
import repeat from '@lib/util/repeat'

const SkeletonProductsCarousel = () => {
  return (
    <Container className="flex flex-col gap-10">
      <div className="h-12 w-[250px] animate-pulse bg-skeleton-primary" />
      <ul
        className="grid w-full grid-cols-1 gap-x-2 gap-y-6 small:grid-cols-2 large:grid-cols-3"
        data-testid="products-list"
      >
        {repeat(3).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default SkeletonProductsCarousel