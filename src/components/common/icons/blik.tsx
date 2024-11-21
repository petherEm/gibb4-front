import React from 'react'

import { IconProps } from 'types/icon'

export const BlikIcon: React.FC<IconProps> = ({
  size = '16',
  color = 'currentColor',
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...attributes}
    >
      <rect width="41.7722" height="22" rx="6" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            transform="scale(0.00333333 0.00632911)"
            xlinkHref="#image0_3411_13862"
          />
        </pattern>
        <image
          id="image0_3411_13862"
          width="300"
          height="158"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
