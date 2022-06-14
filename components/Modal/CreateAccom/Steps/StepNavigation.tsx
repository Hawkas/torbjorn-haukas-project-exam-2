import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Group } from '@mantine/core';
import { StepNavigation } from 'types/createAccom';

export function StepNavigation({
  nextStep,
  prevStep,
  success,
  modals,
  active,
  refreshPage,
}: StepNavigation) {
  return (
    <Group position="center" pt="xl" mt="xl">
      <PrimaryButton
        disabled={active === 0}
        variant="default"
        onClick={
          success.accepted
            ? () => {
                modals.closeModal('create');
                refreshPage();
              }
            : prevStep
        }
      >
        {success.accepted ? 'Close' : 'Back'}
      </PrimaryButton>
      <PrimaryButton primary onClick={nextStep} sx={{ display: active === 3 ? 'none' : 'block' }}>
        Next step
      </PrimaryButton>
    </Group>
  );
}
