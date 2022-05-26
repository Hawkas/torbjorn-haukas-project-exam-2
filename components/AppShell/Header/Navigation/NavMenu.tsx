import { useModals } from '@mantine/modals';
import { useSession } from 'next-auth/react';
import { NavLink, NavLinkProps } from './NavLink';
import { Contact } from '@components/Modal/Contact/Contact';

export function NavMenu({ menuBreak }: Pick<NavLinkProps, 'menuBreak'>) {
  const { data: session } = useSession();
  const modals = useModals();
  const openContactModal = () => {
    modals.openContextModal('contact', {
      innerProps: {
        id: 'formModal',
        modalBody: <Contact />,
      },
    });
  };
  return (
    <>
      <NavLink href="/" menuBreak={menuBreak} component="a">
        Home
      </NavLink>
      <NavLink href="/accommodations" menuBreak={menuBreak} component="a">
        Accommodations
      </NavLink>
      <NavLink href="" onClick={openContactModal} menuBreak={menuBreak} component="button">
        Contact us
      </NavLink>
      {session ? (
        <NavLink href="/admin" menuBreak={menuBreak} component="a">
          Admin
        </NavLink>
      ) : (
        <></>
      )}
    </>
  );
}
