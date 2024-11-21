import { useEffect, useState } from 'react'

import { SearchIcon } from '@components/common/icons'
import { Button } from '@components/common/sub-components/button'
import LocalizedClientLink from '@components/common/sub-components/localized-client-link'
import { Text } from '@components/common/sub-components/text'

export const RecentSearches = ({
  handleOpenDialogChange,
}: {
  handleOpenDialogChange: (value: boolean) => void
}) => {
  const [searches, setSearches] = useState([])
  useEffect(() => {
    const fetchRecentSearches = () => {
      const storedSearches = localStorage.getItem('recentSearches')
      if (storedSearches) {
        setSearches(JSON.parse(storedSearches))
      }
    }

    fetchRecentSearches()
  }, [])

  return (
    <>
      {searches.length ? (
        searches.map((search, id) => {
          return (
            <Button key={id} variant="text" asChild className="w-min">
              <div className="flex gap-4">
                <SearchIcon />
                <LocalizedClientLink
                  href={`/results/${search}`}
                  onClick={() => {
                    handleOpenDialogChange(false)
                  }}
                >
                  {search}
                </LocalizedClientLink>
              </div>
            </Button>
          )
        })
      ) : (
        <Text className="text-secondary">No search history</Text>
      )}
    </>
  )
}
