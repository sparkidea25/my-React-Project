import React from 'react';
import {
    Tabs,
    Tab,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

export const CustomTabs = ({
    tabsItems = [],
    value = 0,
    handleTabChange = () => { },
    tabContainerStyle = {},
    activeTabStyle = {},
    inActiveTabStyle = {},
}) => {
    return (
        <div className={classNames([tabContainerStyle, 'tabs-container'])}>
            <React.Fragment>
                <Tabs value={value}
                    onChange={(event, newValue) => {
                        handleTabChange(newValue)
                    }}
                    className={classNames([tabContainerStyle, 'tabs-container'])}>
                    {tabsItems.map((item, index) => (
                        <Tab key={index + ''} className={`${item.label}-tab`} label={item.label}
                        />
                    ))}
                </Tabs>
                <hr />

            </React.Fragment>
        </div >
    )
}