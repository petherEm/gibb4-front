import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'
import { Heading } from '@components/common/sub-components/heading'
import { Text } from '@components/common/sub-components/text'
import { ContentAttributes } from 'types/strapi'

export const NumericalSection = ({
  data,
}: {
  data: Omit<ContentAttributes, 'Image'>[]
}) => {
  return (
    <Container className="flex flex-col gap-6 bg-secondary small:flex-row large:gap-2">
      {data.map((item, id) => (
        <Box key={id} className="flex flex-1 flex-col items-center gap-4">
          <Heading className="text-4xl text-basic-primary small:text-5xl">
            {item.Title}
          </Heading>
          <Text className="text-center text-secondary" size="lg">
            {item.Text}
          </Text>
        </Box>
      ))}
    </Container>
  )
}