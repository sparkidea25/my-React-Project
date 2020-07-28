import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const AppDrawer = ({
    drawerItems = [],
    drawerId = 'app-drawer',
    closeAlt = 'close',
    companyLogo,
    topShape,
    bottomShape,
    drawerVisible,
    topShapeAlt = 'top-shape',
    bottomShapeAlt = 'bottom-shape',
    onClickAction = () => { },
    drawerViewStyle = {},
    companyLogoStyle = {},
    listItemStyle = {},
    logoContainerStyle = {},
    drawerIconsStyle = {},
    listTabStyle = {},
    backArrow,
    toggleDrawer,
    ...props
}) => {

    const [isActive, updateStatus] = useState(0);
    const currentUrl = window.location.href;
    return (
        <Drawer
            variant="persistent"
            anchor={'left'}
            open={drawerVisible}
            onClose={() => toggleDrawer(false)}
            classes={{}}
            ModalProps={{
                keepMounted: true,
            }}
            className='drawer-menu'
        >

            <div id={drawerId} className={classNames([drawerViewStyle, 'drawer-view'])}>
                <List>
                    {
                        drawerItems.map((item, index) => (
                            <ListItem key={index + ''} onClick={() => {
                                updateStatus(index);
                                onClickAction(item.routeUrl);
                            }}
                                className={classNames([
                                    listItemStyle,
                                    { 'active-tab': (currentUrl.includes(item.routeUrl)) },
                                    'list-item'
                                ])}>
                                <ListItemIcon className={classNames([listTabStyle, 'list-tab'])}>
                                    <img
                                        src={(currentUrl.includes(item.routeUrl)) ? item.selectedIcon : item.unSelectedIcon}
                                        alt={item.alt}
                                        width={20}
                                        height={20}
                                        className={classNames([drawerIconsStyle, 'drawer-icons'])}
                                    />
                                </ListItemIcon>
                                <ListItemText className={classNames([
                                    listTabStyle,
                                    { 'list-tab': (index !== isActive) }
                                ])}>{item.tag}</ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
                <div className="logout_menu" onClick={() => onClickAction('/logout')}>
                    <label>
                        <i>
                            {/* <img src={require(`../../../assets/logout_icon.png`)}  className="img-fluid" width="200px" />*/}
                            </i> Log Out</label> 
                </div>
            </div>
        </Drawer>
    )
}

export default AppDrawer;