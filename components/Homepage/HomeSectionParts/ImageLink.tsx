import { Text, useMantineTheme, Image, Paper, Box, createStyles } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';
import type { ImageObject } from '@globals/images';
import type { Cover, ImageSizes } from 'types/accommodationClean';

type ImageProps = Partial<ImageObject> & Partial<Omit<Cover, 'alt'>>;
interface ImageLink {
  text: string;
  image: ImageProps;
}
const useImageStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transform: 'scale(1)',
    transformOrigin: 'bottom',
    transition: 'transform 0.2s ease-in-out',
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

export default function ImageLink({ text, image, cards }: ImageLink & { cards?: boolean }) {
  const theme = useMantineTheme();
  const { classes } = useImageStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Box className={classes.root}>
      <Image
        imageProps={{
          height: image.height || image.medium?.height,
          width: image.width || image.medium?.width,
        }}
        classNames={{
          image: classes.image,
        }}
        radius="xs"
        src={image.src || image.medium?.src}
        className={classes.image}
        alt={image.alt}
      />
      <Box component="div" mt="-xl" className={classes.labelContainer}>
        <Paper radius="xs" p={theme.other.smallSpacing.lg} shadow="sm">
          <Text
            component={cards ? 'h2' : 'p'}
            className={cards ? textClass.cardHeader : textClass.buttonAlt}
          >
            {text}
          </Text>
        </Paper>
      </Box>
    </Box>
  );
}
