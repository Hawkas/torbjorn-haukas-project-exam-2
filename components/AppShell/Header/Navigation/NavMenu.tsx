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
  onClick?: () => void;
}
export function NavMenu({ menuBreak }: Pick<NavLinkProps, 'menuBreak'>) {
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
    { href: '/', component: 'a', value: 'Home' },
    { href: '/accommodations', component: 'a', value: 'Accommodations' },
    { href: '', component: 'button', value: 'Contact us', onClick: openContactModal },
    { href: '/admin', component: 'a', value: 'Admin' },
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
