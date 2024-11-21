import SkeletonPostTile from '@components/skeletons/sub-components/skeleton-post-tile'
import repeat from '@lib/util/repeat'

const SkeletonBlogPosts = () => {
  return (
    <ul
      className="!mt-6 grid grid-cols-1 gap-2 large:grid-cols-2"
      data-testid="blog-post-list"
    >
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonPostTile />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonBlogPosts