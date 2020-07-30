import React from 'react';
import './style.scss';
import { CustomMenu } from '../custom-menu';

export const AppHeader = ({
    hamburgerIcon,
    menuItems,
    hamburgerVisible = false,
    onHamburgerClick = () => { },
    logout = () => {}
}) => (
        <header className="fixed-top">
            <nav className="d-flex justify-content-around align-items-center align-items-md-end">
                <div className="navbar-brand">
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
                    </span>}
                    <ul className="nav-admin ml-auto">
                        <li className="active">
                            <a href="#">Content</a>
                        </li>
                        <li>
                            <a href="#">User</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onClick={() => logout()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );