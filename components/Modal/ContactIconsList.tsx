import { faAt, faClock, faLocationDot, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, createStyles, Group, Text } from '@mantine/core';
import { textStyles } from '@styles/typography';
import React from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    fontSize: '35px',
    backgroundColor: 'transparent',
  },

  title: {
    color: theme.fn.rgba(theme.white, 0.75),
    margin: 0,
    marginBottom: theme.other.smallSpacing.sm,
  },

  description: {
    margin: 0,
    color: theme.white,
    fontWeight: theme.other.fontWeights.regular,
  },
}));

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof faAt;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon, title, description, className, ...others }: ContactIconProps) {
  const { classes, cx } = useStyles();
  const { classes: textClass } = textStyles();
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      <Box mr="sm">
        <FontAwesomeIcon className={classes.icon} icon={icon} fixedWidth />
      </Box>
      <div>
        <Text component="h3" className={cx(classes.title, textClass.label)}>
          {title}
        </Text>
        <Text component="p" className={cx(classes.description, textClass.info)}>
          {description}
        </Text>
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
}

const MOCKDATA = [
  { title: 'Email', description: 'holi@daze.no', icon: faAt },
  { title: 'Phone', description: '+47 80085101', icon: faPhone },
  {
    title: 'Address',
    description: 'Vetrlidsallmenningen 23A, 5014 Bergen',
    icon: faLocationDot,
  },
  {
    title: 'Working hours',
    description: '12 p.m. – 11 p.m.',
    icon: faClock,
  },
];

export function ContactIconsList({ data = MOCKDATA }: ContactIconsListProps) {
  const items = data.map((item, index) => <ContactIcon key={index} {...item} />);
  return (
    <Group direction="column" sx={(theme) => ({ gap: theme.other.largeSpacing.md })}>
      {items}
    </Group>
  );
}
