import React from 'react';
import './style.scss';
import { CustomMenu } from '../custom-menu';
import { ROUTES } from '../../../shared/constants';
import { Link } from 'react-router-dom';

export const AppHeader = ({
    hamburgerIcon,
    menuItems,
    hamburgerVisible = false,
    onHamburgerClick = () => { },
    logout = () => { },
    menuVisible,
    history
}) => {
    const activeColor = history.location.pathname === ROUTES.CONTENT ? '#61d1fc' : 'white'
    return (<header className="fixed-top">
        <nav className="d-flex justify-content-around align-items-center align-items-md-end">
            <div className="navbar-brand" onClick={() => history.push(ROUTES.DASHBOARD)}>
                <a className="brand-logo" href="#">
                    <img src={require(`../../../assets/img/logo.png`)} width="250" alt="Collyde" className="img-fluid" />
                </a>
            </div>

            <div className="navbar-menu">
                {hamburgerVisible && <span className="humburger_icon">
                    <i><img onClick={(e) => {
                        onHamburgerClick(e)
                    }} src={require(`../../../assets/img/icons/hamburger_icon.svg`)} alt="Collyde" width="26" />
                    </i>
                </span>
                }
                {hamburgerVisible ? menuVisible && <ul className="nav-admin ml-auto" >
                    <li className={history.location.pathname === (ROUTES.WATCH_PARTY || ROUTES.ADD_WATCH_PARTY || ROUTES.UPLOAD_WATCH_PARTY) ? "active" : ""}>
                        <a href="#" onClick={() => history.push(ROUTES.WATCH_PARTY)} >Content</a>
                    </li>
                    <li className={history.location.pathname===(ROUTES.USERS)?"active":""}>
                        <a href="#" onClick={()=> history.push(ROUTES.USERS)}>Users</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" onClick={() => logout()}>Logout</a>
                    </li>
                </ul> : <ul className="nav-admin ml-auto">

                        <li className={(history.location.pathname === ROUTES.WATCH_PARTY) || (history.location.pathname === ROUTES.ADD_WATCH_PARTY) || (history.location.pathname === ROUTES.UPLOAD_WATCH_PARTY) ? "active" : ""}>
                            <a onClick={() => history.push(ROUTES.WATCH_PARTY)}>Content</a>
                        </li>
                        <li className={history.location.pathname=== ROUTES.USERS?"active":""}>
                            {/* <Link to={ROUTES.USERS}>Users</Link> */}
                            <a href="#" onClick={()=> history.push(ROUTES.USERS)}>Users</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onClick={() => logout()}>Logout</a>
                        </li>
                    </ul>}
            </div>
        </nav>
    </header>
    )
}