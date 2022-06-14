import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faCheckCircle, faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Center, Stack, Text } from '@mantine/core';
import type { StepCompleted } from 'types/createAccom';

function StatusMessage({ error, message }: { error?: boolean; message?: string }) {
  return (
    <Center mt={64}>
      <Stack>
        <FontAwesomeIcon
          icon={error ? faClose : faCheckCircle}
          color={error ? '#930006' : '#37b24d'}
          size="6x"
        />
        <Text
          align="center"
          size="xl"
          color={error ? 'red' : undefined}
          variant={error ? undefined : 'gradient'}
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          mt="xl"
          weight={700}
        >
          {error ? 'Failed to upload' : 'Successfully uploaded'}
          {error ? (
            <Text weight={400} size="lg">
              {message}
            </Text>
          ) : null}
        </Text>
      </Stack>
    </Center>
  );
}

export function StepCompleted({ success, previewCard }: StepCompleted) {
  return (
    <>
      {success.accepted ? (
        <StatusMessage />
      ) : success.rejected ? (
        <StatusMessage error message={success.errorMessage} />
      ) : (
        <>
          <Text align="center" mt="xl" size="xl">
            All done!
          </Text>
          <Text align="center" size="sm" color="dimmed">
            Press submit to upload it!
          </Text>
          <Box sx={{ maxWidth: '408px', margin: '48px auto' }}>{previewCard}</Box>
        </>
      )}
      <PrimaryButton
        primary
        type="submit"
        mt={64}
        mx="auto"
        sx={{
          display: success.accepted ? 'none' : 'block',
          width: '100%',
          maxWidth: '160px',
        }}
      >
        Submit
      </PrimaryButton>
    </>
  );
}
