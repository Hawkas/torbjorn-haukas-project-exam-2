import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { Box, createStyles, Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { LocationChips } from './Filters/LocationChips';
import { TypeButtons } from './Filters/TypeButtons';

const useStyles = createStyles((theme) => ({
  filtersWrap: {
    width: '100%',
    flexDirection: 'column',
  },
}));

export function HeaderSection() {
  const router = useRouter();
  const { classes } = useStyles();
  return (
    <>
      <TitleSection title="Accommodations">
        <Box component="section">
          <Center className={classes.filtersWrap}>
            <LocationChips router={router} />
            <TypeButtons router={router} />
          </Center>
        </Box>
      </TitleSection>
    </>
  );
}
