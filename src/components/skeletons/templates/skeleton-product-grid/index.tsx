import SkeletonProductPreview from '@components/skeletons/sub-components/skeleton-product-preview'
import repeat from '@lib/util/repeat'

const SkeletonProductGrid = () => {
  return (
    <ul
      className="grid w-full grid-cols-1 gap-x-2 gap-y-6 small:grid-cols-2 large:grid-cols-3"
      data-testid="products-list"
    >
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonProductGrid
