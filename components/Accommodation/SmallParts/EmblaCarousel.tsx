import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, createStyles, Image } from '@mantine/core';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Cover, ImagesRoom } from 'types/accommodationClean';

const useCarouselStyles = createStyles((theme) => ({
  embla: {
    overflow: 'hidden',
    position: 'relative',
  },
  emblaContainer: {
    display: 'flex',
  },
  emblaSlide: {
    position: 'relative',
    flex: '0 0 100%',
  },
  emblaViewport: {
    [`&.is-draggable`]: {
      cursor: 'grab',
    },
    [`&.is-dragging`]: {
      cursor: 'grabbing',
    },
  },
  emblaButton: {
    position: 'absolute',
    '&:first-of-type': {
      left: theme.other.largeSpacing.sm,
      [theme.fn.smallerThan('sm')]: {
        left: theme.other.smallSpacing.lg,
      },
      [theme.fn.smallerThan('xs')]: {
        left: theme.other.smallSpacing.md,
      },
    },
    '&:last-of-type': {
      right: theme.other.largeSpacing.sm,
      [theme.fn.smallerThan('sm')]: {
        right: theme.other.smallSpacing.lg,
      },
      [theme.fn.smallerThan('xs')]: {
        right: theme.other.smallSpacing.md,
      },
    },
    top: '50%',
    transform: 'translateY(-50%)',
    '&:not(:disabled):active': {
      transform: 'translateY(calc(-50% + 1px))',
    },
    touchAction: 'manipulation',
    color: theme.black,
    borderRadius: '50px',
    padding: '16px',
    width: '72px',
    height: '72px',
    fontSize: theme.other.fontSizes.lg,
    [theme.fn.smallerThan('sm')]: {
      padding: '8px',
      width: '48px',
      height: '48px',
      fontSize: theme.other.fontSizes.sm,
    },
    [theme.fn.smallerThan('xs')]: {
      padding: '8px',
      width: '34px',
      height: '34px',
      fontSize: theme.other.fontSizes.xs,
    },

    border: 'none',
    backgroundColor: theme.fn.rgba(theme.white, 0.4),
    boxShadow: theme.shadows.md,
    '&:not(:nth-of-type(5)):disabled': {
      opacity: 0.3,
      cursor: 'default',
    },
  },

  emblaDots: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    paddingTop: theme.other.smallSpacing.lg,
  },
  emblaDot: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    padding: 0,
    outline: 0,
    border: 0,
    width: '30px',
    height: '30px',
    marginRight: theme.other.smallSpacing.md,
    marginLeft: theme.other.smallSpacing.md,
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      backgroundColor: theme.colors.gray[3],
      width: '100%',
      height: '4px',
      borderRadius: theme.radius.xs,
      content: `""`,
    },
    [`&.is-selected::after`]: {
      backgroundColor: theme.colors.blue[6],
      opacity: 1,
    },
  },
}));
interface CarouselProps {
  cover: Cover;
  roomImages: ImagesRoom[];
}

export function EmblaCarousel({ cover, roomImages }: CarouselProps) {
  const { classes, cx } = useCarouselStyles();
  const emblaOptions = {
    selected: 'is-selected',
    draggable: 'is-draggable',
    dragging: 'is-dragging',
  };
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false }, [ClassNames(emblaOptions)]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const carouselArray = roomImages.map((item, index) => (
    <Box key={index} className={classes.emblaSlide}>
      <Image
        imageProps={{ height: item.image.large.height, width: item.image.large.width }}
        alt={item.image.alt}
        src={item.image.large.src}
      />
    </Box>
  ));
  return (
    <>
      <Box className={classes.embla}>
        <Box className={cx(classes.emblaViewport, 'embla__viewport')} ref={viewportRef}>
          <Box className={classes.emblaContainer}>
            <Box className={classes.emblaSlide}>
              <Image
                imageProps={{ height: cover.large!.height, width: cover.large!.width }}
                alt={cover.alt}
                src={cover.large!.src}
              />
            </Box>
            {carouselArray}
          </Box>
        </Box>
        <Button
          aria-label="Previous image"
          disabled={!prevBtnEnabled}
          variant="default"
          className={classes.emblaButton}
          onClick={scrollPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          aria-label="Next image"
          disabled={!nextBtnEnabled}
          variant="default"
          className={classes.emblaButton}
          onClick={scrollNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </Box>
      <Box className={classes.emblaDots}>
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            aria-label={`Jump to image ${index}`}
            key={index}
            className={cx(classes.emblaDot, { 'is-selected': index === selectedIndex })}
            onClick={() => scrollTo(index)}
          />
        ))}
      </Box>
    </>
  );
}
