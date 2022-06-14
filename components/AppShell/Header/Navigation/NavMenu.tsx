import { Contact } from '@components/Modal/Contact/Contact';
import { LoadingOverlay } from '@mantine/core';
import { useModals } from '@mantine/modals';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NavLink, NavLinkProps } from './NavLink';

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
      id: 'contact-us',
      innerProps: {
        modalBody: <Contact />,
      },
    });
  };
  const links: Links[] = [
    { href: '/', component: 'a', value: 'Home', onClick },
    { href: '/accommodations', component: 'a', value: 'Accommodations', onClick },
    { href: '', component: 'button', value: 'Contact us', onClick: openContactModal },
    { href: '/admin', component: 'a', value: 'Admin', onClick },
  ];
  const navMenu = links.map((item, index) => {
    if (!session && item.value === 'Admin') return null;
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
        <LoadingOverlay visible />
      </div>
    );
  }
  return <>{navMenu}</>;
}
