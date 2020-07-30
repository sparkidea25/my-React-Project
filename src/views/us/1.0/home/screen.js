import React, { useEffect, useState } from 'react';
import "./style.scss";
import { Helmet } from "react-helmet";
const {
    DASHBOARD_PAGE_LOGO,
    PAGE_TITLES,
} = require(`../../../../shared/constants`);

export const Screen = ({
}) => {
    return (
        <>
            <Helmet>
                <title>{PAGE_TITLES.dashboard}</title>
            </Helmet>
            <div className="container-fluid">
                <div className="content-panel">
                    <ul className="content_section">
                        <li><a href="#">Content Managment </a></li>
                        <li><a href="#">User Managment</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}