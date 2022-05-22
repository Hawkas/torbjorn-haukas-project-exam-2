import { GroupedTransition, Navbar } from '@mantine/core';
import { dropdownStyles } from './HeaderDropdown.styles';
import { NavMenu } from './Navigation/NavMenu';
import { HeaderProps } from './HeaderTop';

const duration = 500;

export function HeaderDropdown({ menuBreak, opened }: HeaderProps) {
  const { classes } = dropdownStyles(menuBreak);
  return (
    <>
      <GroupedTransition
        mounted={opened}
        transitions={{
          container: { duration, transition: 'slide-right', timingFunction: 'ease' },
          contents: { duration: duration / 2, transition: 'fade', timingFunction: 'ease' },
        }}
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Navbar fixed style={styles.container} className={classes.vertical}>
            <NavMenu menuBreak={menuBreak} />
          </Navbar>
        )}
      </GroupedTransition>
    </>
  );
}
