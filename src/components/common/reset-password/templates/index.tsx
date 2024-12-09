import { ResetPassword } from '@components/common/reset-password/components/reset-password'
import { Box } from '@components/common/sub-components/box'
import { Container } from '@components/common/sub-components/container'

export function ResetPasswordTemplate() {
  return (
    <Box className="flex justify-center bg-secondary">
      <Container className="w-full !max-w-[660px] !pb-16 !pt-8">
        <div className="flex items-center justify-center">
          <ResetPassword />
        </div>
      </Container>
    </Box>
  )
}
