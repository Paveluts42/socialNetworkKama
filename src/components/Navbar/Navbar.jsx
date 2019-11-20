import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Frends from "./Frends/Frends";

const Navbar = props => {
  let frends = props.frendsNav.piple.map(f => {
    return <Frends id={f.id} key={f.id} name={f.name} />;
  });
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Message
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={s.frends}>
        <NavLink to="/frends" activeClassName={s.activeLink}>
          Frends
        </NavLink>
        {frends}
      </div>
    </nav>
  );
};

export default Navbar;
