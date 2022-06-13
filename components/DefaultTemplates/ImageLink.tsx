import type { ImageObject } from '@globals/images';
import { AspectRatio, Box, createStyles, Image, Paper, Text, useMantineTheme } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';
import type { Cover } from 'types/accommodationClean';

export type ImageProps = Partial<ImageObject> & Partial<Omit<Cover, 'alt'>>;
interface ImageLink {
  text: string;
  image: ImageProps;
  cards?: boolean;
}
const useImageStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transform: 'scale(1)',
    minHeight: '233px',
    height: '100%',
    transformOrigin: 'bottom',
    transition: 'transform 0.2s ease-in-out',
    objectFit: 'cover',
  },
  root: {
    cursor: 'pointer',
    [`&:hover .${getRef('image')}`]: {
      transform: 'scale(1.015)',
    },
  },
  labelContainer: {
    borderRadius: theme.radius.xs,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    [theme.fn.largerThan(808)]: {
      marginTop: '-23px',
    },
    [theme.fn.largerThan(914)]: {
      marginTop: `-${theme.spacing.xl}px`,
    },
  },
}));

export default function ImageLink({ text, image, cards }: ImageLink) {
  const theme = useMantineTheme();
  const { classes } = useImageStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Box className={cards ? undefined : classes.root}>
      <AspectRatio ratio={1000 / 667} sx={{ minHeight: '233px', height: '100%' }}>
        <Image
          imageProps={{
            style: { minHeight: '233px', objectFit: 'cover' },
            height: image.height || image.medium?.height || undefined,
            width: image.width || image.medium?.width || undefined,
          }}
          styles={{ imageWrapper: { height: '100%' }, figure: { height: '100%' } }}
          classNames={{
            image: cards ? undefined : classes.image,
          }}
          radius="xs"
          src={image.src || image.medium?.src}
          className={classes.image}
          alt={image.alt || undefined}
        />
      </AspectRatio>
      <Box component="div" mt="-xl" className={classes.labelContainer}>
        <Paper radius="xs" p={theme.other.smallSpacing.lg} shadow="sm">
          <Text
            lineClamp={1}
            component={cards ? 'h2' : 'p'}
            sx={{ overflow: 'visible' }}
            className={cards ? textClass.cardHeader : textClass.buttonAlt}
          >
            {text}
          </Text>
        </Paper>
      </Box>
    </Box>
  );
}
