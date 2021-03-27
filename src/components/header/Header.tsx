import { NavLink } from 'react-router-dom';
import style from './header.module.css';

export function Header() {
  return (
    <header className={style.header}>
      <nav>
        <NavLink exact to="/" activeClassName={style.headerLinkActive}>
          Start Page
        </NavLink>
        <NavLink to="/characters" activeClassName={style.headerLinkActive}>
          Characters
        </NavLink>
        <NavLink to="/episodes" activeClassName={style.headerLinkActive}>
          Episodes
        </NavLink>
        <NavLink to="/locations" activeClassName={style.headerLinkActive}>
          Locations
        </NavLink>
        <NavLink to="/list" activeClassName={style.headerLinkActive}>
          My watch list
        </NavLink>
      </nav>
    </header>
  );
}
