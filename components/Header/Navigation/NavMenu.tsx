import { NavLink, NavLinkProps } from './NavLink';

export function NavMenu({ menuBreak }: Pick<NavLinkProps, 'menuBreak'>) {
  return (
    <>
      <NavLink href="/" menuBreak={menuBreak} component="a">
        Home
      </NavLink>
      <NavLink href="/accommodations" menuBreak={menuBreak} component="a">
        Accommodations
      </NavLink>
      <NavLink href="#contact" menuBreak={menuBreak} component="button">
        Contact us
      </NavLink>
    </>
  );
}
