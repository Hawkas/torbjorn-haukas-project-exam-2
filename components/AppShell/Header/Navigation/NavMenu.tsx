import { useModals } from '@mantine/modals';
import { NavLink, NavLinkProps } from './NavLink';
import { Contact } from '@components/Modal/Contact/Contact';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { LoadingOverlay } from '@mantine/core';

export type SessionType = { session: Session | null };
interface Links {
  href: string;
  component: 'a' | 'button';
  value: string;
  onClick?: React.MouseEventHandler;
}
export function NavMenu({ menuBreak, onClick }: Pick<NavLinkProps, 'menuBreak' | 'onClick'>) {
  const modals = useModals();
  const { data: session, status } = useSession();
  const openContactModal = () => {
    modals.openContextModal('contact', {
      innerProps: {
        id: 'formModal',
        modalBody: <Contact />,
      },
    });
  };
  const links: Links[] = [
    { href: '/', component: 'a', value: 'Home', onClick: onClick },
    { href: '/accommodations', component: 'a', value: 'Accommodations', onClick: onClick },
    { href: '', component: 'button', value: 'Contact us', onClick: openContactModal },
    { href: '/admin', component: 'a', value: 'Admin', onClick: onClick },
  ];
  const navMenu = links.map((item, index) => {
    if (!session && item.value === 'Admin') return;
    return (
      <NavLink
        href={item.href}
        component={item.component}
        menuBreak={menuBreak}
        onClick={item.onClick}
        key={index}
      >
        {item.value}
      </NavLink>
    );
  });
  // To avoid the nav menu flickering between logged-in/logged-out state.
  if (status === 'loading') {
    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <LoadingOverlay visible={true} />
      </div>
    );
  }
  return <>{navMenu}</>;
}
