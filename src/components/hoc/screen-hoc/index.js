import React, { useState } from 'react';
import { Loader } from '../../atoms/loader';
import AppDrawer from '../../atoms/app-drawer';
import './style.scss';
import { connect } from 'react-redux';
import { ROUTES, HEADER_MENU_ITEMS } from '../../../shared/constants';
import { STRINGS } from '../../../shared/constants/us/strings';
import { AppHeader } from '../../atoms/app-header';

const HOC = ({
    containerStyle,
    logout = () => { },
    containerId = 'screen-hoc-container',
    contentId = 'screen-content',
    childrenStyle,
    onClickAction = () => { },
    drawerId = 'app-drawer',
    drawerItems,
    companyLogo,
    topShape,
    bottomShape,
    hamburgerIcon,
    headerLogo,
    children,
    loader = false,
    backArrow,
    headerLogoAction,
    history
}) => {
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1024) {
                setDrawerVisible(false);
                return;
            }
            else if (window.innerWidth >= 1024) {
                setDrawerVisible(true);
                return;
            }
        });
    })


    const [drawerVisible, setDrawerVisible] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const responsiveScroll = () => { }
    return (
        <div id={containerId} className={containerStyle} onScroll={responsiveScroll}>
            <AppHeader
                hamburgerIcon={hamburgerIcon}
                headerLogo={headerLogo}
                hamburgerVisible={drawerVisible ? window.innerWidth < 1025 ? true : false : true}
                logout={logout}
                menuItems={[
                    ...HEADER_MENU_ITEMS,
                    {
                        label: STRINGS.LOG_OUT,
                        routeUrl: ROUTES.LOGOUT,
                        onClick: (changedUrl) => {
                            onClickAction(changedUrl)
                        }
                    }
                ]}
                onHamburgerClick={(e) => {
                    setMenuVisible(!menuVisible);
                    e.stopPropagation()
                }}
                menuVisible={menuVisible}
                history={history}
            />

            {/* <AppDrawer
                drawerId={drawerId}
                drawerItems={drawerItems}
                companyLogo={companyLogo}
                topShape={topShape}
                drawerVisible={drawerVisible}
                onClickAction={(changedUrl) => {
                    onClickAction(changedUrl);
                    window.innerWidth < 1024 && setDrawerVisible(false)
                }}
                bottomShape={bottomShape}
                toggleDrawer={() => { setDrawerVisible(!drawerVisible); }}
                backArrow={backArrow}
            /> */}

            <div id={contentId} className={childrenStyle} onClick={(e) => { window.innerWidth < 1024 && setDrawerVisible(false) }}>
                {children}
                {loader &&
                    <Loader />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const ScreenHOC = connect(mapStateToProps, mapDispatchToProps)(HOC);