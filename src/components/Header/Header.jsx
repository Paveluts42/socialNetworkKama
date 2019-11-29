import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom"

const Header = (props) => {
    return (<header className={s.header}>
        <div className={s.loginBlock}>
            {props.isAuth ? <div className="globolColorText">{props.login} <button className={s.button} onClick={props.loginOut}><svg className={s.button__svg}><rect className={s.button__rect}></rect></svg>Log out</button></div> : <NavLink to={"/login"}>login</NavLink>}
        </div>
    </header>)
};

export default Header;