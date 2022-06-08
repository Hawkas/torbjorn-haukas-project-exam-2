import { faAt, faClock, faLocationDot, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capsFirstLetter } from '@helpers/stringConversions';
import { Box, createStyles, Group, Text } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';
import { ContactClean } from 'types/accommodationClean';

const iconStyles = createStyles((theme) => ({
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

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title' | 'id'> {
  icon: typeof faAt;
  title: React.ReactNode;
  description: React.ReactNode;
  id?: number;
}

function ContactIcon({ icon, title, description, className, id, ...others }: ContactIconProps) {
  const { classes, cx } = iconStyles();
  const { classes: textClass } = useTextStyles();
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
  className?: string;
  contactInfo?: ContactClean;
}

const contactData = [
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

//? Make data from API fit to the the defined object structure
const mapContact = ({ ...contactInfo }: ContactClean) => {
  if (!contactInfo) return null;
  const contactIcons: ContactIconProps[] = Object.keys(contactInfo).map((key) => ({
    title: capsFirstLetter(key),
    description: contactInfo[key],
    icon: key === 'address' ? faLocationDot : key === 'email' ? faAt : faPhone,
  }));
  return contactIcons;
};

export function ContactIconsList({
  data = contactData,
  className,
  contactInfo,
}: ContactIconsListProps) {
  const contactArray = contactInfo ? mapContact(contactInfo) : data;
  const items = contactArray!.map((item, index) => <ContactIcon key={index} {...item} />);
  return (
    <Group
      direction="column"
      className={className}
      sx={(theme) => ({ gap: theme.other.largeSpacing.md })}
    >
      {items}
    </Group>
  );
}
