import { Title, TitleProps } from '@mantine/core';
import { useStyles, StyleProps } from './Heading.styles';

interface HeadingProps extends StyleProps, TitleProps {
  children?: React.ReactNode;
  className?: 'displayH1' | 'primaryH1' | 'primaryH2' | 'primaryH3' | 'serifH2';
}

export function Heading({ className, order, blue, align, children, mt, mb, pt, pb }: HeadingProps) {
  const { classes } = useStyles({ blue });
  return (
    <Title
      mt={mt}
      mb={mb}
      pt={pt}
      pb={pb}
      className={className ? classes[`${className}`] : undefined}
      order={order}
      align={align}
    >
      {children}
    </Title>
  );
}
