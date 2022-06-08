import { GroupedTransition, Navbar } from '@mantine/core';
import { useDropdownStyles } from './HeaderDropdown.styles';
import { HeaderProps } from './HeaderTop';
import { NavMenu } from './Navigation/NavMenu';

const duration = 300;

export function HeaderDropdown({
  menuBreak,
  opened,
  onClick,
}: HeaderProps & { onClick: React.MouseEventHandler }) {
  const { classes } = useDropdownStyles(menuBreak);
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
            <NavMenu menuBreak={menuBreak} onClick={onClick} />
          </Navbar>
        )}
      </GroupedTransition>
    </>
  );
}
