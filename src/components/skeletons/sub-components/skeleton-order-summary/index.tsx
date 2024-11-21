import SkeletonButton from '@components/skeletons/sub-components/skeleton-button'
import SkeletonCartTotals from '@components/skeletons/sub-components/skeleton-cart-totals'
import SkeletonCodeForm from '@components/skeletons/sub-components/skeleton-code-form'

const SkeletonOrderSummary = () => {
  return (
    <div className="flex w-full flex-col gap-2 large:w-[326px] xl:w-[437px]">
      <SkeletonCodeForm />
      <div className="flex animate-pulse flex-col gap-5 bg-skeleton-primary p-5">
        <SkeletonCartTotals header={false} />
        <SkeletonButton />
      </div>
    </div>
  )
}

export default SkeletonOrderSummary
