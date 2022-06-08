import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, createStyles, Group } from '@mantine/core';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

export const useStyles = createStyles((theme) => ({
  returnLink: {
    color: theme.colors.blue[5],
    fontWeight: theme.other.fontWeights.medium,
  },
}));

export function ReturnLink({
  children,
  ...others
}: Omit<ComponentPropsWithoutRef<'div'>, 'title'>) {
  const { classes } = useStyles();
  return (
    <div {...others}>
      <Group align="center" py="md" className={classes.returnLink} spacing="xs">
        <FontAwesomeIcon icon={faChevronLeft} />
        <Link href="/accommodations" passHref>
          <Anchor className={classes.returnLink}>{children}</Anchor>
        </Link>
      </Group>
    </div>
  );
}
