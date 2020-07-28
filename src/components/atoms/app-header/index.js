import React from 'react';
import './style.scss';
import { CustomMenu } from '../custom-menu';

export const AppHeader = ({
    hamburgerIcon,
    menuItems,
    hamburgerVisible = false,
    onHamburgerClick = () => { }
}) => (
        <header className="fixed-top">
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row">
                <div className="navbar-brand-wrapper d-flex align-items-center">
                    <a className="navbar-brand brand-logo" href="#">
                        {/* <img src={require(`../../../assets/logo.png`)} width="150" alt="SEF" /> */}
                    </a>
                </div>

                <div className="navbar-menu-wrapper d-flex align-items-center flex-grow-1">

                    <ul className="navbar-nav navbar-nav-right ml-auto">
                        {hamburgerVisible && <span className="humburger_icon">
                            <i><img onClick={(e) => {
                                onHamburgerClick(e)
                            }} src={hamburgerIcon} alt="hamburger" width="26" />
                            </i>
                        </span>}
                        <li className="nav-item d-none d-md-block">
                            <form className="search-form" action="#">
                                <i className="fa fa-search"> 
                                {/* <img src={require(`../../../assets/icons/search_icon.svg`)} width="18" alt="SEF" /> */}
                                </i>
                                <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
                            </form>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator message-dropdown" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i>
                                    {/* <img src={require(`../../../assets/icons/notifcation_icon.svg`)} width="18" alt="SEF" /> */}
                                    </i>
                                <span className="count">7</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="messageDropdown">
                                <a className="dropdown-item py-3">
                                    <p className="mb-0 font-weight-medium float-left">You have 7 unread mails </p>
                                    <span className="badge badge-pill badge-primary float-right">View all</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis">Marian Garner </p>
                                        <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis">David Grey </p>
                                        <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">

                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis">Travis Jenkins </p>
                                        <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown d-xl-inline-flex user-dropdown profile-drop">
                            <CustomMenu
                                menuItems={menuItems}
                            >
                                <span> Tom Cruise </span>
                                <img
                                    // src={require(`../../../assets/top_right.png`)}
                                    width="60"
                                    className="img-xs rounded-circle ml-2"
                                    alt="SEF" />
                            </CustomMenu>
                        </li>
                    </ul>

                </div>
            </nav>
        </header>
    );